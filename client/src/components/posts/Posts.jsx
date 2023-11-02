import React from "react";
import Post from "../post/Post";
import "./posts.scss";
import { useGetAllPostsQuery } from "../../features/posts/postApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../features/posts/post";

const Posts = () => {
  const dispatch = useDispatch();
  const { data, isError, isLoading, isSuccess, error } = useGetAllPostsQuery();
  const { posts } = useSelector((state) => state.post);
  console.log(localStorage.getItem("user"));
  if (isLoading) {
    return <h1>Loading Posts....</h1>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isSuccess) {
    dispatch(setAllPosts(data));
  }

  return (
    <div className="posts">
      {posts.length > 0
        ? posts.map((post) => <Post post={post} key={post._id} />)
        : null}
    </div>
  );
};

export default Posts;
