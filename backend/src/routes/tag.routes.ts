import { Router } from "express";
import { addTagController, deleteTagController, getTagsController, updateTagController } from "../controllers/tag.controller";
import { authenticateJWT } from "../shared/auth.util";



const router = Router();

router.get('/', getTagsController);
router.post('/', authenticateJWT, addTagController);
router.put('/', authenticateJWT, updateTagController);
router.delete('/', authenticateJWT, deleteTagController);



export default router;