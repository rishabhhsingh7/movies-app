import React from "react";
import logo from "../../assets/logo.svg";
import "./Header.css";
const Header = () => {
  return (
    <div className="Header">
      <img className="headerlogo" src={logo} alt="logo" />
    </div>
  );
};

export default Header;
