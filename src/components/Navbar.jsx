import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
      <Link to="/" className="title">
        Interactive 3D
      </Link>
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
