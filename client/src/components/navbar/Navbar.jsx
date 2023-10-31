import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Brightness6OutlinedIcon from "@mui/icons-material/Brightness6Outlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import image from "../../assets/loginPageImage.jpg";
import CreatePost from "../createPost/CreatePost";
const Navbar = () => {
  return (
    <header className="navbar">
      <article className="left">
        <Link to="/">
          <span>Lets Connect</span>
        </Link>
        <HomeOutlinedIcon />
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search your friends here ...." />
        </div>
      </article>
      <article className="right">
        <Person2OutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <CreatePost />
        <div className="user">
          <img src={image} alt="" />
          <span>John Doe</span>
        </div>
      </article>
    </header>
  );
};

export default Navbar;
