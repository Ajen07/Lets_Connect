import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ credentials }) => ({
        url: "/api/v1/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: ({ values }) => ({
        url: "/api/v1/auth/register",
        method: "POST",
        body: values,
      }),
    }),
  }),
});

export const { useLoginMutation ,useRegisterMutation} = authApiSlice;
