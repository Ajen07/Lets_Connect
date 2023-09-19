import React from "react";
import "./login.scss";
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <main className="login">
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
          <h1>Login</h1>
          <form action="">
            <input type="text" name="email" id="email" placeholder="email" />
            <input
              type="text"
              name="password"
              id="password"
              placeholder="password"
            />
            <button type="submit">Login</button>
          </form>
        </article>
      </section>
    </main>
  );
};

export default Login;
