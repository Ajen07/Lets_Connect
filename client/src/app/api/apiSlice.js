import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),

  endpoints: () => ({}),
});
