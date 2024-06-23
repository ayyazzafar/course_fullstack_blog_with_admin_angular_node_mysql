import { Router } from "express";
import {
  addCommentController,
  deleteCommentController,
  getPostCommentsController,
  updateCommentController,
} from "../controllers/comment.controller";
import { authenticateJWT } from "../shared/auth.util";

const router = Router();

router.get("/:postId", getPostCommentsController);
router.post("/", authenticateJWT, addCommentController);
router.put("/", authenticateJWT, updateCommentController);
router.delete("/", authenticateJWT, deleteCommentController);

export default router;
