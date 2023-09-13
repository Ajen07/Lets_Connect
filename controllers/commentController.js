import { StatusCodes } from "http-status-codes";
import CommentSchema from "../model/CommentSchema.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { checkUserPermissions } from "../utils/checkUserPermissions.js";
import { encrytion } from "../utils/encryption.js";
import { decryption } from "../utils/decryption.js";

const getAllComments = async (req, res) => {
  const comments = await CommentSchema.find({});
  comments.forEach(
    (comment) => (comment.comment = decryption(comment.comment))
  );
  res.status(StatusCodes.OK).json({ comments, totalComments: comments.length });
};
const getSinglePostComments = async (req, res) => {
  const { id: postId } = req.params;
  const comments = await CommentSchema.find({ postId });
  comments.forEach(
    (comment) => (comment.comment = decryption(comment.comment))
  );
  res.status(StatusCodes.OK).json({ comments, totalComments: comments.length });
};
const getSingleComment = async (req, res) => {
  const { id: commentId } = req.params;
  const singleComment = await CommentSchema.findOne({ _id: commentId });
  if (!comment) {
    throw new NotFoundError(`No comment with Id:${commentId}`);
  }
  const { comment } = singleComment;
  singleComment.comment = decryption(comment);
  res.status(StatusCodes.OK).json({ singleComment });
};
const createComment = async (req, res) => {
  const { comment, postId, isReply, parentId } = req.body;
  if (!comment) {
    throw new BadRequestError("Comment cannot be empty");
  }
  let depthOfComment = 0;
  if (isReply === "TRUE") {
    const comment = await CommentSchema.findOne({ _id: parentId });
    depthOfComment = comment.depth + 1;
  }
  const encryptedData = encrytion(comment);

  const newComment = await CommentSchema.create({
    comment: encryptedData,
    userId: req.user.userId,
    postId,
    parent: isReply === "TRUE" ? parentId : null,
    depth: depthOfComment,
  });
  res.status(StatusCodes.CREATED).json({ msg: "Comment added successfully" });
};
const deleteComment = async (req, res) => {
  const { id: commentId } = req.params;
  const comment = await CommentSchema.findOne({ _id: commentId });
  if (!comment) {
    throw new NotFoundError(`No comment with Id:${commentId}`);
  }
  checkUserPermissions(req.user, comment.userId);
  await CommentSchema.deleteOne({ _id: commentId });
  res.status(StatusCodes.OK).json({ msg: "comment deleted successfully" });
};
const updateComment = async (req, res) => {
  const { comment } = req.body;
  const { id: commentId } = req.params;
  const commentExists = await CommentSchema.findOne({ _id: commentId });
  if (!commentExists) {
    throw new NotFoundError(`No comment with Id:${commentId}`);
  }
  checkUserPermissions(req.user, commentExists.userId);
  commentExists.comment = encrytion(comment);
  await commentExists.save();
  res.status(StatusCodes.OK).json({ msg: "comment upadated successfully" });
};

export {
  getAllComments,
  getSinglePostComments,
  getSingleComment,
  createComment,
  deleteComment,
  updateComment,
};
