import React, { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "./createPost.scss";
import { closeModal, openModal } from "../../features/modal/modal";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import { ToastContainer, toast } from "react-toastify";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useCreatePostMutation } from "../../features/posts/postApiSlice";

const CreatePost = () => {
  const { isModalOpen, type } = useSelector((state) => state.modal);
  const [createPost, { data, isSuccess, error }] = useCreatePostMutation();
  const initialValues = { description: "" };
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    // Handle form submission here
    initialValues.description = "";
    toast.promise(
      createPost({ values }),
      {
        pending: "Posting...",
        success: "Post Added",
        error: error?.data?.msg,
      },
      {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  };
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
      {isModalOpen && type === "CREATE_POST" && (
        <div className="modal">
          <div className="modal-content">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form>
                <div>
                  <Field name="description">
                    {({ field, form }) => (
                      <ReactQuill
                        value={field.value}
                        onChange={(value) =>
                          form.setFieldValue(field.name, value)
                        }
                        onBlur={() => form.setFieldTouched(field.name, true)}
                      />
                    )}
                  </Field>
                </div>
                <div className="btn-container">
                  <button type="submit">Post</button>
                  <button onClick={handleModalClose}>Close</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
