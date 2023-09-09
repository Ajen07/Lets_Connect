import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  likePost,
  createPost,
  deletePost,
  updatePost,
  getSinglePost,
} from "../controllers/postController.js";
import { uploadPicture } from "../controllers/authController.js";
import { validatePost } from "../utils/validation.js";

const router = express.Router();

router
  .route("/")
  .get(getFeedPosts)
  .post(validatePost, uploadPicture, createPost);

router.route("/user-posts/:userId").get(getUserPosts);

router.route("/:id/like").patch(likePost);
router
  .route("/:id")
  .patch(validatePost, uploadPicture, updatePost)
  .get(getSinglePost)
  .delete(deletePost);

export default router;
