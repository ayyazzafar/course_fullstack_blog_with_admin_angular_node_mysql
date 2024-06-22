import { Router } from "express";
import { addPostController, deletePostController, getAllPostsController, updatePostController } from "../controllers/post.controller";


const router = Router();

router.get('/', getAllPostsController)
router.post('/', addPostController)
router.put('/', updatePostController)
router.delete('/', deletePostController)


export default router;