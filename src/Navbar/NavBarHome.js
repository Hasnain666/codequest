import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import Logo from "../Navbar/logo.png";
import "../Navbar/NavBarHome.css";
import { useAuth } from "../contexts/authContext/index";

export const NavbarHome = ({ onRegisterClick, onLogout }) => {
  const { user } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
    setDropdownOpen(false);
  };

  // Extract the first letter of the user's email
  const profileLetter = user?.email?.charAt(0).toUpperCase() || "U";

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
            <Link to="/">Explore</Link>
          </li>
          <li className="nav-object">
            <button onClick={onRegisterClick}>Code</button>
          </li>
          <li className="nav-object">
            <button onClick={onRegisterClick}>Forum</button>
          </li>
          <li className="nav-object">
            <button onClick={onRegisterClick}>About Us</button>
          </li>
          <li className="nav-object-prof">
            <div className="profile-container" onClick={handleToggleDropdown}>
              <div className="profile-letter">{profileLetter}</div>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout} className="dropdown-item">
                    <IoLogOut size={20} /> Logout
                  </button>
                  {/* Add more dropdown items here if needed */}
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};
