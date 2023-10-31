import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "./createPost.scss";
import { closeModal, openModal } from "../../features/modal/modal";
import { useDispatch, useSelector } from "react-redux";

const CreatePost = () => {
  const { isModalOpen,type } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleModalOpen = () => {
    dispatch(openModal());
  };
  const handleModalClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <button onClick={handleModalOpen}>
        <ModeEditIcon />
      </button>
      {(isModalOpen && type === "CREATE_POST") && (
        <div className="modal">
          <div className="modal-content">
            iosh
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
