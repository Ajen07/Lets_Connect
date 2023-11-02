import React from "react";
import Navbar from "../navbar/Navbar";
import LeftBar from "../leftbar/LeftBar";
import RightBar from "../rightbar/RightBar";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./layout.scss";

const Layout = () => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <main className="main">
        <LeftBar />

        <Outlet />

        <RightBar />
      </main>
    </>
  );
};

export default Layout;
