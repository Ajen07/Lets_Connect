import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  type: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openCreateModal: (state, action) => {
      state.isModalOpen = true;
      state.type = "CREATE_POST";
    },
    openEditModal: (state, action) => {
      state.isModalOpen = true;
      state.type = "EDIT_POST";
    },
    closeModal: (state, action) => {
      state.isModalOpen = false;
      state.type = "";
    },
  },
});

export const { openCreateModal, closeModal ,openEditModal} = modalSlice.actions;

export default modalSlice.reducer;
