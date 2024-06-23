import { Router } from "express";
import { loginController, logoutController, refreshTokenController, registerController } from "../controllers/auth.controller";


const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/refresh_token', refreshTokenController)
router.post('/logout', logoutController)


export default router;