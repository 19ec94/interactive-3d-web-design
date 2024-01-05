import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../Assets/logo.jpeg";
import x from "../Assets/x-mark-24.png";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
      <Link to="/" className="title">
        <img id="logo" src={logo} alt="" />
      </Link>

      {/* <span></span>
        <span></span>
        <span></span> */}
      {menuOpen === false ? (
        <div
          className="menu"
          onClick={() => {
            setMenuOpen(!menuOpen);
            console.log();
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        <div
          className="menu"
          onClick={() => {
            setMenuOpen(!menuOpen);
            console.log();
          }}
        >
          <img src={x} id="x"></img>
        </div>
      )}

      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/login">LogIn</NavLink>
        </li>
        <li>
          <NavLink to="/levels">Levels</NavLink>
        </li>
        <li>
          <NavLink to="/scoreboard">Scoreboard</NavLink>
        </li>
      </ul>
    </nav>
  );
};
