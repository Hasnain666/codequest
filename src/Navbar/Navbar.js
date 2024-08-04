import React from "react";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import "../Navbar/Navbar.css";
import Logo from "../Navbar/logo.png";
import { IconContext } from "react-icons";

export const Navbar = ({ onRegisterClick }) => {
  return (
    <nav className="navBar">
      <div className="navDiv">
        <Link className="navBar-Brand" to="/">
          <img
            src={Logo}
            width="180"
            height="150"
            alt="Logo"
            className="logo"
          />
        </Link>
        <ul className="nav-links">
          <li className="nav-object">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-object">
            <button onClick={onRegisterClick}>Get Started</button>
          </li>
          <li className="nav-object-prof">
            <IconContext.Provider
              value={{ color: "#befd73", className: "ProfileIcon" }}
            >
              <VscAccount
                onClick={onRegisterClick}
                size={25}
                className="register-icon"
              />
            </IconContext.Provider>
          </li>
        </ul>
      </div>
    </nav>
  );
};
