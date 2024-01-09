import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PasswordValid } from "../PasswordValid";
// import { PasswordIdent } from "../PasswordIdent";

import "./Login.css";
import user_icon from "../../Assets/person.png";
import email_icon from "../../Assets/email.png";
import password_icon from "../../Assets/password.png";
import { PasswordIdent } from "../PasswordIdent";

export const Login = () => {
  const [action, setAction] = useState("Sign Up");
  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" />
        </div>
        {action === "Login" ? (
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
            />
          </div>
        ) : (
          <div className="passwords">
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
              />
            </div>
            <PasswordValid password={password} />
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder="Repeat Password"
                onChange={(e) => setPassword2(e.target.value)}
                value={password2}
                name="password"
              />
            </div>
            <PasswordIdent password={password} password2={password2} />
          </div>
        )}

        {action === "Sign Up" ? (
          <div></div>
        ) : (
          <div className="forgot-password">
            {" "}
            Forgot Password? <Link to="/forgot">Click here</Link>
          </div>
        )}

        <div className="submit-container">
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Sign Up");
            }}
          >
            Sign Up
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => {
              setAction("Login");
            }}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};
