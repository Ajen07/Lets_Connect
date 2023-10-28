import React from "react";
import "./register.scss";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../features/auth/authApiSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const Register = () => {
  const [register, { data, isLoading, isError, error, isSuccess }] =
    useRegisterMutation();
  const navigation = useNavigate();
  if (isError) {
    toast.error(`${error.data.msg}`, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      pauseOnHover: false,
    });
  }
  if (isSuccess) {
    toast.success("Registration Successful....Redirecting", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      pauseOnHover: false,
    });
    setTimeout(() => {
      navigation("/sign-in");
    }, 3000);
  }
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("firstname is required"),
    lastName: Yup.string().required("lastname is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Id is required"),
    password: Yup.string().required("Password is required"),
    occupation: Yup.string().required("Occupation is required"),
    location: Yup.string().required("Location is required"),
  });
  const onSubmit = (values) => {
    register({ values });
  };
  return (
    <main className="register">
      {isSuccess || isError ? <ToastContainer /> : null}
      <section className="card">
        <article className="left">
          <h1>Lets Connect</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            iste porro blanditiis dignissimos eaque quis ullam, cumque harum,
            illo eos dolore explicabo unde cum tenetur possimus incidunt
            repellat commodi vel. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Repellendus iste porro blanditiis dignissimos
            eaque quis ullam, cumque harum, illo eos dolore explicabo unde cum
            tenetur possimus incidunt repellat commodi vel. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Repellendus iste porro
            blanditiis dignissimos eaque quis ullam, cumque harum, illo eos
            dolore explicabo unde cum tenetur possimus incidunt repellat commodi
            vel.
          </p>
          <span>Already have an account?</span>

          <Link to="/sign-in">
            <button>Login</button>
          </Link>
        </article>
        <article className="right">
          <h1>Register</h1>
          {isLoading ? <span>Registering User...</span> : null}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div>
                <Field type="file" name="file" />
                <ErrorMessage name="file" component="span" />
              </div>
              <div>
                <label htmlFor="firstName">Firstname</label>
                <Field name="firstName" type="text" id="firstName" />
                <ErrorMessage component="span" name="firstName" />
              </div>
              <div>
                <label htmlFor="lastName">Lastname</label>
                <Field name="lastName" type="text" id="lastName" />
                <ErrorMessage component="span" name="lastName" />
              </div>
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
              <div>
                <label htmlFor="occupation">Occupation</label>
                <Field name="occupation" type="text" id="occupation" />
                <ErrorMessage component="span" name="occupation" />
              </div>
              <div>
                <label htmlFor="location">Location</label>
                <Field name="location" type="text" id="location" />
                <ErrorMessage component="span" name="location" />
              </div>

              <button type="submit" disabled={isLoading}>
                Submit
              </button>
            </Form>
          </Formik>
        </article>
      </section>
    </main>
  );
};

export default Register;
