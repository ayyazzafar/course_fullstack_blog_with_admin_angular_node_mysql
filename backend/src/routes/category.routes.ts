import { Router } from "express";
import { addCategoryController, deleteCategoryController, getCategories, updateCategoryController } from "../controllers/category.controller";
import { authenticateJWT } from "../shared/auth.util";


const router = Router();


router.get('/',  getCategories);
router.post('/', authenticateJWT,  addCategoryController);
router.put('/', authenticateJWT,  updateCategoryController);
router.delete('/', authenticateJWT,  deleteCategoryController);

export default router;