import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css"

export const Home = () => {
  return <div>
  <div className="img-center"><img src="/src/Assets/logo.jpeg" width={"250px"} /></div>
  <div className="button-container">
    <div className="custom-li"><NavLink to="/login"><button type="button" className="custom-button">Login</button></NavLink> </div>
    <div className="custom-li"><NavLink to="/about"><button type="button" className="custom-button">About</button></NavLink></div>
    <div className="custom-li"><NavLink to="/scoreboard"><button type="button" className="custom-button">Scoreboard</button></NavLink></div>

  </div>
  </div>;
};
