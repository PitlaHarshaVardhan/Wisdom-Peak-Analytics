import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoSunnyOutline } from "react-icons/io5";
import { FaMoon } from "react-icons/fa";
import "./index.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  return (
    <header className={`header ${darkMode ? "dark" : "light"}`}>
      <Link to="/">
        <div className="logo">
          <img
            src="https://assets.static-upwork.com/org-logo/1780896817370251264"
            alt="Logo"
          />
        </div>
      </Link>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {darkMode ? (
            <IoSunnyOutline className="icons" />
          ) : (
            <FaMoon className="icons" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
