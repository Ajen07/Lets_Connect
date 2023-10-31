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
  }),
});

export const { useGetAllPostsQuery, useGetSinglePostQuery } = postApiSlice;
