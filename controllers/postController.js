import { StatusCodes } from "http-status-codes";
import Post from "../model/PostSchema.js";
import BadRequestError from "../errors/BadRequestError.js";
import NotFoundError from "../errors/NotFoundError.js";
import { checkUserPermissions } from "../utils/checkUserPermissions.js";

const getFeedPosts = async (req, res) => {
  const posts = await Post.find({});
  res.status(StatusCodes.OK).json({ posts, totalPosts: posts.length });
};

const getUserPosts = async (req, res) => {
  const { userId } = req.params;

  const posts = await Post.find({ userId });

  res.status(StatusCodes.OK).json({ posts, totalLength: posts.length });
};

const getSinglePost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }
  res.status(StatusCodes.OK).json({ post });
};

const createPost = async (req, res) => {
  const { picturePath, description } = req.body;

  if (!description) {
    throw new BadRequestError("Please provide all the values");
  }

  const userId = req.user.userId;

  const newPost = await Post.create({
    userId,
    picturePath,
    description,
    likes: {},
  });

  res.status(StatusCodes.CREATED).json({ newPost });
};

const likePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user.userId;
  const post = await Post.findOne({ _id: id });
  const isLiked = post.likes.get(userId);

  if (isLiked) {
    post.likes.delete(userId);
  } else {
    post.likes.set(userId, true);
  }
  await post.save();
  res.status(StatusCodes.OK).json({ post });
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }
  checkUserPermissions(req.user, post.userId);
  await Post.deleteOne({ _id: postId });
  res.status(StatusCodes.OK).json({ msg: "Post deleted successfully" });
};
const updatePost = async (req, res) => {
  const { picturePath, description } = req.body;
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }
  checkUserPermissions(req.user, post.userId);
  post.picturePath = picturePath;
  post.description = description;
  await post.save();
  res.status(StatusCodes.OK).json({ msg: "Post updated successfully" });
};

export {
  getFeedPosts,
  getUserPosts,
  createPost,
  likePost,
  deletePost,
  updatePost,
  getSinglePost
};
