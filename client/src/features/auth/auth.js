import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      console.log(action);
      state.user = action.payload.user;
    },
    setLogOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUserCredentials, setLogOut } = authSlice.actions;

export default authSlice.reducer;
