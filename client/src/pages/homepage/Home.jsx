import React from "react";
import "./home.scss";
import Stories from "../../components/stories/Stories";
import Posts from "../../components/posts/Posts";

const Home = () => {
  return (
    <section className="home">
      <Stories />
      <Posts/>
    </section>
  );
};

export default Home;
