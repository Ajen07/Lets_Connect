import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  isEdit: false,
  editId: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setAllPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setIsEdit: (state, action) => {
      state.isEdit = !state.isEdit;
      state.editId = action.payload.editId;
    },
  },
});

export const {setAllPosts,setIsEdit} = postSlice.actions;

export default postSlice.reducer;
