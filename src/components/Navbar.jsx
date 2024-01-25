import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo.jpeg";
import x from "../Assets/x-mark-24.png";

import { useAuth } from './AuthContext';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Define a variable to store login status. If logged in, display all
  // navigation link, else display only about, login links.
  const {isLoggedIn} = useAuth();

  console.log('navbar element', isLoggedIn);//Debugging

  return (
    <nav>
      <Link to="/" className="title">
        <img id="logo" src={logo} alt="" />
      </Link>

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
          <img src={x} id="x" alt=""></img>
        </div>
      )}

        {  isLoggedIn ? (
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/levels">Levels</NavLink>
        </li>
        <li>
          <NavLink to="/scoreboard">Scoreboard</NavLink>
        </li>
      </ul>
        ) : (
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <li>
          <NavLink to="/scoreboard">Scoreboard</NavLink>
        </li>
      </ul>
        )
        }
    </nav>
  );
};
