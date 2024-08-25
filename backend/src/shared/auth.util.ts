
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Request, Response } from 'express';
const secretKey = process.env.JWT_SECRET!;

export function generateToken(userId: number, expiresIn='1h'): string{
  const payload = {userId};
  const token = jwt.sign(payload, secretKey, {
    expiresIn
  });
  
  return token;
  
}

export function encryptPassword(password: string): string{

  const encryptedPassword = jwt.sign(password, secretKey);
  
  return encryptedPassword;
  
}
  
  export function verifyToken(token:string){
    try{
      return jwt.verify(token, secretKey);
    }catch(err){
      return null;
    }
  }
  
  export function authenticateJWT(req: Request , res:Response, next:Function){
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token){
      return res.status(401).json({message: 'Access Denied. Token is not provided.'});
    }

    authenticateJWT_common(req, res, next, token);
  
   
  }

  export function authenticateJWTOptional(req: Request , res:Response, next:Function){
    const token = req.header('Authorization')?.replace('Bearer ', '');
    authenticateJWT_common( req, res, next, token);
  
   
  }

  function authenticateJWT_common(req: Request,  res: Response, next: Function, token?: string){
    if(!token){
      return next();
    }

    const verified = verifyToken(token);
  
    if(!verified){
      return res.status(401).json({message: 'Invalid Token.'});
    }
  
    User.findByPk((verified as any).userId).then((user)=>{
      if(user){
        (req as any).user = user;
      }
      else{
        return res.status(401).json({message: 'User not found.'});
      }
      next();
    });
  }

  
  