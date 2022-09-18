import React from "react";
import logo from "../../assets/logo.svg";
import "./Header.css";

const Header = () => {
  return (
    <div className="Header">
      <img className="headerlogo" src={logo} alt="logo" />
      <button type="button" className="button">
        Book Show
      </button>
    </div>
  );
};

export default Header;
