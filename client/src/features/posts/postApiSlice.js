import { apiSlice } from "../../app/api/apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "/api/v1/posts",
        method: "GET",
      }),
    }),
    getSinglePost: builder.query({
      query: (id) => ({
        url: `/api/v1/posts/${id}`,
        method: "GET",
      }),
    }),
    createPost: builder.mutation({
      query: (id) => ({
        url: `/api/v1/posts/${id}`,
        method: "POST",
      }),
    }),
    editPost: builder.mutation({
      query: (id) => ({
        url: `/api/v1/posts/${id}`,
        method: "PATCH",
      }),
    }),
    deletePost: builder.query({
      query: (id) => ({
        url: `/api/v1/posts/${id}`,
        method: "DELETE",
      }),
    }),
   
  }),
});

export const { useGetAllPostsQuery, useGetSinglePostQuery } = postApiSlice;
