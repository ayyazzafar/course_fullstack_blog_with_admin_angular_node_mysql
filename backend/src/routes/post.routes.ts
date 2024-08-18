import { Router } from "express";
import { addPostController, deletePostController, getAllPostsController, getPostBySlugController, updatePostController } from "../controllers/post.controller";
import { authenticateJWT } from "../shared/auth.util";


const router = Router();

router.get('/', getAllPostsController)
router.get('/slug/:slug', getPostBySlugController)
router.post('/', authenticateJWT, addPostController)
router.put('/', authenticateJWT, updatePostController)
router.delete('/', authenticateJWT, deletePostController)


export default router;