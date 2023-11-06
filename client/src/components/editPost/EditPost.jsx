import React from "react";
import "./editPost.scss";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../features/modal/modal";
import { Formik, Field, Form, ErrorMessage, useField } from "formik";
import { useEditPostMutation } from "../../features/posts/postApiSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";

const EditPost = () => {
  const { isEdit, editId, posts } = useSelector((state) => state.post);
  const { isModalOpen, type } = useSelector((state) => state.modal);
  const [editPost, { error }] = useEditPostMutation();
  const dispatch = useDispatch();
  const handleModalClose = () => {
    dispatch(closeModal());
  };
  const post = posts.find((post) => post._id === editId);
  const initialValues = {
    description: post?.description,
  };
  const handleSubmit = (values) => {
    initialValues.description = "";
    toast.promise(
      editPost({ values, id: editId }),
      {
        pending: "Editing...",
        success: "Post Edited",
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
  return (
    <>
      {isModalOpen && type === "EDIT_POST" && (
        <div className="modal1">
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

export default EditPost;
