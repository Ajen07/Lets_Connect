import React from "react";
import Navbar from "../navbar/Navbar";
import LeftBar from "../leftbar/LeftBar";
import RightBar from "../rightbar/RightBar";
import { Outlet } from "react-router-dom";
import './layout.scss'

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="main">
        <LeftBar />
        <Outlet />
        <RightBar />
      </main>
    </>
  );
};

export default Layout;
