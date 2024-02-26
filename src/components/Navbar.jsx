import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Navbar.css";
import logo from "../Assets/logo.jpeg";
import x from "../Assets/x-mark-24.png";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Define a variable to store login status. If logged in, display all
  // navigation link, else display only about, login links.
  const sessionData = JSON.parse(sessionStorage.getItem("sessionData"));
  var isLoggedIn; 
  // Check if sessionData is not null.
  // Example scenario: when directly accessing protected API endpoint
  // http://localhost:3000/dashboard
  if (sessionData){
    isLoggedIn = sessionData.isLoggedIn;
  } else {
    isLoggedIn = false;
  }

  return (
    <nav>
      <Link to="/" className="title">
        <div className="logo-container">
          <img id="logo" src={logo} alt="" />
        </div>
      </Link>

      {menuOpen === false ? (
        <div
          className="menu"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        >
          <span></span>
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
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/scoreboard">Scoreboard</NavLink>
        </li>
        <li></li>
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
        <li>
        <NavLink to="/anatomy">Anatomy</NavLink>
        </li>
      </ul>
        )
        }
    </nav>
  );
};
