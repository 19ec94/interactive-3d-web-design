import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav>
      <Link to="/">Website</Link>
      <ul className="navElements">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/home">Login</Link>
        </li>
      </ul>
    </nav>
  );
};
