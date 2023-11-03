import React from "react";
import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link, UNSAFE_DataRouterStateContext } from "react-router-dom";
import Comments from "../comments/Comment";
import { useState } from "react";
import parse from "html-react-parser";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeletePostMutation,
  useGetAllPostsQuery,
} from "../../features/posts/postApiSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [deletePost, { data, error }] = useDeletePostMutation();
  const {
    user: { _id },
  } = useSelector((state) => state.auth);
  //TEMPORARY
  const liked = false;
  const handleDeletePost = async ({ id }) => {
    await toast.promise(
      deletePost({ id }),
      {
        pending: "Deleting Post ...",
        success: "Post deleted from universe",
        error: "some error",
      },
      {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          {_id === post.userId ? (
            <div
              className="edit-delete-features"
              onMouseEnter={() => setShowOptions((prevState) => !prevState)}
              onMouseLeave={() => setShowOptions((prevState) => !prevState)}
            >
              <MoreHorizIcon />
              {showOptions && (
                <div className="btn-container">
                  <button
                    className="delete-btn"
                    title="Delete Post"
                    onClick={() => handleDeletePost({ id: post._id })}
                  >
                    <DeleteIcon />
                  </button>
                  <button className="edit-btn" title="Edit Post">
                    <EditIcon />
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
        <div className="content">
          <div>{parse(post.description)}</div>
          <img src={post.picturePath} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
            12 Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
