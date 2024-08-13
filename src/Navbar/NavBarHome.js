import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import Logo from "../Navbar/logo.png";
import "../Navbar/NavBarHome.css";
import { useAuth } from "../contexts/authContext/index";

export const NavbarHome = ({ onLogout }) => {
  const { user } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
    setDropdownOpen(false);
  };

  const profileLetter = user?.email?.charAt(0).toUpperCase() || "U";

  const isActive = (path) => {
    if (
      path === "/home" &&
      (location.pathname === "/home" || location.pathname === "/")
    ) {
      return true;
    }
    return location.pathname === path;
  };

  return (
    <nav className="navBar">
      <div className="navDiv">
        <Link className="navBar-Brand" to="/home">
          <img
            src={Logo}
            width="180"
            height="150"
            alt="Logo"
            className="logo"
          />
        </Link>
        <ul className="nav-links">
          <li className={`nav-object ${isActive("/home") ? "active" : ""}`}>
            <Link to="/home">Explore</Link>
          </li>
          <li className={`nav-object ${isActive("/code") ? "active" : ""}`}>
            <Link to="/code">Code</Link>
          </li>
          <li className={`nav-object ${isActive("/forum") ? "active" : ""}`}>
            <Link to="/forum">Forum</Link>
          </li>
          <li className={`nav-object ${isActive("/about") ? "active" : ""}`}>
            <Link to="/about">About Us</Link>
          </li>
          <li className="nav-object-prof">
            <div className="profile-container" onClick={handleToggleDropdown}>
              <div className="profile-letter">{profileLetter}</div>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout} className="dropdown-item">
                    <IoLogOut size={20} /> Logout
                  </button>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};
