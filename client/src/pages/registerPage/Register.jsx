import React from "react";
import "./register.scss";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <main className="register">
      <section className="card">
        <article className="left">
          <h1>Lets Connect</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            iste porro blanditiis dignissimos eaque quis ullam, cumque harum,
            illo eos dolore explicabo unde cum tenetur possimus incidunt
            repellat commodi vel.
          </p>
          <span>Already have an account?</span>

          <Link to="/sign-in">
            <button>Login</button>
          </Link>
        </article>
        <article className="right">
          <h1>Register</h1>
          <form action="">
            <input type="file" name="image" className="custom-file-input" />
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="firstname"
            />
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="lastname"
            />
            <input type="text" name="email" id="email" placeholder="email" />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="password"
            />
            <input
              type="text"
              name="occupation"
              id="occupation"
              placeholder="occupation"
            />
            <input
              type="text"
              name="location"
              id="location"
              placeholder="location"
            />
            <button type="submit">Register</button>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Register;
