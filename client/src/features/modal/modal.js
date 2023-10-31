import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  type: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.type = "CREATE_POST";
    },
    closeModal: (state, action) => {
      state.isModalOpen = false;
      state.type = "";
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
