import { apiSlice } from "../../app/api/apiSlice";

export const postApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "/api/v1/posts",
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    getSinglePost: builder.query({
      query: (id) => ({
        url: `/api/v1/posts/${id}`,
        method: "GET",
      }),
    }),
    createPost: builder.mutation({
      query: ({ values }) => ({
        url: `/api/v1/posts`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Post"],
    }),
    editPost: builder.mutation({
      query: ({ values, id }) => ({
        url: `/api/v1/posts/${id}`,
        method: "PATCH",
        body: values,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/api/v1/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetSinglePostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useEditPostMutation,
} = postApiSlice;
