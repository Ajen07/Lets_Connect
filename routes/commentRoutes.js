import express from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  getSingleComment,
  getSinglePostComments,
  updateComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.route("/").get(getAllComments).post(createComment);

router.route("/posts/:id/comments").get(getSinglePostComments);

router
  .route("/:id")
  .patch(updateComment)
  .delete(deleteComment)
  .get(getSingleComment);

export default router  
