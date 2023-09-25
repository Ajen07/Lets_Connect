import React, { useEffect } from "react";
import "./login.scss";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setUserCredentials } from "../../features/auth/auth";
const Login = () => {
  const dispatch = useDispatch();
  const [login, { data, isLoading, isError, error, isSuccess }] =
    useLoginMutation();
  if (isError) {
    toast.error(`${error.data.msg}`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      pauseOnHover: false,
    });
  }
  if (isSuccess) {
    dispatch(setUserCredentials(data));
  }
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Id is required"),
    password: Yup.string().required("Password is required"),
  });
  const onSubmit = (values) => {
    login({ credentials: values });
  };

  return (
    <main className="login">
      {isError ? <ToastContainer /> : null}
      <section className="card">
        <article className="left">
          <h1>Lets Connect</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            iste porro blanditiis dignissimos eaque quis ullam, cumque harum,
            illo eos dolore explicabo unde cum tenetur possimus incidunt
            repellat commodi vel.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/sign-up">
            <button type="button">Register</button>
          </Link>
        </article>
        <article className="right">
          {isLoading ? <span>Authenticating User...</span> : null}
          <h1>Login</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div>
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" id="email" />
                <ErrorMessage component="span" name="email" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field name="password" type="password" id="password" />
                <ErrorMessage component="span" name="password" />
              </div>

              <button type="submit" disabled={isLoading}>
                Submit
              </button>
            </Form>
          </Formik>
          <div>Forgot Password?</div>
        </article>
      </section>
    </main>
  );
};

export default Login;
