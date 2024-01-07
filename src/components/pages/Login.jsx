import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";
import user_icon from "../../Assets/person.png";
import email_icon from "../../Assets/email.png";
import password_icon from "../../Assets/password.png";

import FormElement from './FormElement';


export const Login = () => {
  const [action, setAction] = useState("Sign Up");
  // Create a reusable form element
  return (
    <div className="container">
      <form>
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Login" ? (
            <div></div>
          ) : (
            <FormElement
              imgSrc={user_icon}
              inputType="text"
              inputName="user_name"
              inputPlaceholder="Name"
            />
          )}
            <FormElement
              imgSrc={email_icon}
              inputType="text"
              inputName="user_email"
              inputPlaceholder="Email address"
            />
          {action === "Login" ? (
            <FormElement
              imgSrc={password_icon}
              inputType="text"
              inputName="user_password"
              inputPlaceholder="Enter your password"
            />
          ) : (
            <div className="passwords">
            <FormElement
              imgSrc={password_icon}
              inputType="text"
              inputName="user_password"
              inputPlaceholder="Enter your password"
            />
            <FormElement
              imgSrc={password_icon}
              inputType="text"
              inputName="user_password_repeat"
              inputPlaceholder="Repeat your password"
            />
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
      </form>
    </div>
  );
};
