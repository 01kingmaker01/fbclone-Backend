import express from "express";
import { createPost, deletePost, getPosts, updatePost } from "../controllers";
import { authMiddleware } from "../middleware/authFirebase";
const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getPosts)
  .post(authMiddleware, createPost);
router
  .route("/:id")
  .patch(authMiddleware, updatePost)
  .delete(authMiddleware, deletePost);

export default router;
