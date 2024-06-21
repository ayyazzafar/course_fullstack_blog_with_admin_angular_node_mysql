import { Router } from "express";
import { addTagController, deleteTagController, getTagsController, updateTagController } from "../controllers/tag.controller";



const router = Router();

router.get('/', getTagsController);
router.post('/', addTagController);
router.put('/', updateTagController);
router.delete('/', deleteTagController);



export default router;