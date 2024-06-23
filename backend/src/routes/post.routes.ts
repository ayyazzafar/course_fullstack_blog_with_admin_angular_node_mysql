import { Router } from "express";
import { addPostController, deletePostController, getAllPostsController, updatePostController } from "../controllers/post.controller";
import { authenticateJWT } from "../shared/auth.util";


const router = Router();

router.get('/', getAllPostsController)
router.post('/', authenticateJWT, addPostController)
router.put('/', authenticateJWT, updatePostController)
router.delete('/', authenticateJWT, deletePostController)


export default router;