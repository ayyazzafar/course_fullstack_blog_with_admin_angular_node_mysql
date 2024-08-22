import { Request, Response } from "express";
import { z } from "zod";
import { addUser, getUserByEmail, updateUser } from "../services/user.service";
import { encryptPassword, generateToken, verifyToken } from "../shared/auth.util";
import { addToken, deleteTokens, getToken } from "../services/token.service";
import { sendConfirmationEmail, sendForgotPasswordEmail } from "../shared/email.util";
const passwordZodRules = z.string().min(6).max(100).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
    {
        message: 'Password must contain at least one uppercase letter, one lowercase letter and one number.'
    }

); // Minimum six characters, at least one uppercase letter, one lowercase letter and one number

export const registerController = async (req: Request, res: Response) => {
    const schema = z.object({
        name: z.string().min(3).max(100),
        email: z.string().email(),
        password: passwordZodRules
    });

    const parsedData = schema.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json(parsedData.error);
    }

    let { email, password, name } = parsedData.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    password = encryptPassword(password);

    // Create user
    let user = await addUser(email, password, name);

    user = user.toJSON()

    delete user.password;

    const token = generateToken(user.id!);

    await addToken(token, 'activation', user.id!)

    await sendConfirmationEmail(email, token)

    return res.status(201).json(user);
}

export const loginController = async (req: Request, res: Response) => {

    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(100)
    });

    const parsedData = schema.safeParse(req.body);

    if (!parsedData.success)
        return res.status(400).json(parsedData.error);

    const { email, password } = parsedData.data;

    const user = await getUserByEmail(email);

    if (!user)
        return res.status(400).json({ message: 'User not found.' });

    if (user.get('status') !== 'active') {
        return res.status(400).json({ message: 'Please confirm your email.' });
    }

    const dbPassword = verifyToken(user.password!);

    if (dbPassword !== password) {
        return res.status(400).json({ message: 'Invalid password.' });
    }

    // Generate token
    const accessToken = generateToken(user.get('id'), '10d');
    const refreshToken = generateToken(user.get('id'), '7d');

    // delete old tokens
    await deleteTokens(user.get('id'));

    // Save refresh token
    await addToken(refreshToken, 'refresh', user.get('id'));
    await addToken(accessToken, 'access', user.get('id'));

    // create and send session to client
    const session = {
        accessToken,
        refreshToken,
        user: user.toJSON()
    }

    delete session.user.password;

    return res.status(200).json(session);

}

export const refreshTokenController = async (req: Request, res: Response) => {
    const schema = z.object({
        refreshToken: z.string()
    });

    const parsedData = schema.safeParse(req.body);

    if (!parsedData.success)
        return res.status(400).json(parsedData.error);

    const { refreshToken } = parsedData.data;

    const isTokenValid = verifyToken(refreshToken);

    if (!isTokenValid) {
        return res.status(400).json({ message: 'Invalid token or expired.' });
    }

    const dbRefreshToken = await getToken(refreshToken);

    if (!dbRefreshToken || dbRefreshToken.get('type') !== 'refresh')
        return res.status(400).json({ message: 'Invalid token.' });

    const userId = dbRefreshToken.get('userId');

    const accessToken = generateToken(userId!);
    const newRefreshToken = generateToken(userId!, '7d');

    // delete old tokens
    await deleteTokens(userId!);

    // Save refresh token
    await addToken(
        newRefreshToken,
        'refresh',
        userId!
    );

    // Save access token
    await addToken(
        accessToken,
        'access',
        userId!
    );

    return res.status(200).json({
        accessToken,
        refreshToken: newRefreshToken
    })

}

export const logoutController = async (req: Request, res: Response) => {

    const schema = z.object({
        refreshToken: z.string()
    });

    const parsedData = schema.safeParse(req.body);

    if (!parsedData.success)
        return res.status(400).json(parsedData.error);

    const { refreshToken } = parsedData.data;

    const isTokenValid = verifyToken(refreshToken);

    if (!isTokenValid) {
        return res.status(400).json({ message: 'Invalid token or expired.' });
    }

    const dbRefreshToken = await getToken(refreshToken);

    if (!dbRefreshToken || dbRefreshToken.get('type') !== 'refresh') {
        return res.status(400).json({ message: 'Invalid token.' });
    }

    const userId = dbRefreshToken.get('userId');

    await deleteTokens(userId!);

    return res.status(200).json({ message: 'Logged out.' });


}

export const confirmEmailController = async (req: Request, res: Response) => {
    const { token } = req.params;

    const isTokenValid = verifyToken(token);

    if (!isTokenValid) {
        return res.status(400).json({ message: 'Invalid token or expired.' });
    }

    const dbToken = await getToken(token);

    if (!dbToken || dbToken.get('type') !== 'activation') {
        return res.status(400).json({ message: 'Invalid token.' });
    }

    const userId = dbToken.get('userId');

    await updateUser({
        id: userId!,
        status: 'active'
    })

    await deleteTokens(userId!);

    res.redirect(
        process.env.FRONTEND_URL +
        '/auth/login');
}

export const forgotPasswordController = async (req: Request, res: Response) => {
    const schema = z.object({
        email: z.string().email(),
    })

    const parsedData = schema.safeParse(req.body);

    if (!parsedData.success)
        return res.status(400).json(parsedData.error);

    const { email } = parsedData.data;

    const user = await getUserByEmail(email);

    if (!user)
        return res.status(400).json({ message: 'User not found.' });

    // Generate token
    const token = generateToken(user.get('id'));

    // delete old tokens
    await deleteTokens(user.get('id'));

    // Save new token in database
    await addToken(token, 'reset', user.get('id'));

    // Send email
    await sendForgotPasswordEmail(email, token);

    return res.status(200).json({ message: 'Email sent.' });


}


export const resetPasswordController = async (req: Request, res: Response) => {

    const schema = z.object({
        token: z.string(),
        password: passwordZodRules
    });

    const parsedData = schema.safeParse(req.body);

    if (!parsedData.success)
        return res.status(400).json(parsedData.error);

    const { token, password } = parsedData.data;

    const isTokenValid = verifyToken(token);

    if (!isTokenValid) {
        return res.status(400).json({ message: 'Invalid token or expired.' });
    }

    const dbToken = await getToken(token);

    if (!dbToken || dbToken.get('type') !== 'reset') {
        return res.status(400).json({ message: 'Invalid token.' });
    }

    const userId = dbToken.get('userId');


    const encryptedPassword = encryptPassword(password);

    await updateUser({
        id: userId!,
        password: encryptedPassword
    })

    await deleteTokens(userId!);


    return res.status(200).json({ message: 'Password updated.' });

}