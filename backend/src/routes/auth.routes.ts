import { Router } from "express";
import { confirmEmailController, forgotPasswordController, loginController, logoutController, refreshTokenController, registerController, resetPasswordController } from "../controllers/auth.controller";


const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/refresh_token', refreshTokenController)
router.post('/logout', logoutController);
router.get('/confirm-email/:token', confirmEmailController)
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password', resetPasswordController);


export default router;