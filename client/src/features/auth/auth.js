import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      console.log(action);
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    setLogOut: (state) => {
      state.user = null;
    },
  },
});

export const { setUserCredentials, setLogOut } = authSlice.actions;

export default authSlice.reducer;
