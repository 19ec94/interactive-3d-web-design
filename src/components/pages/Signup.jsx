import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";
import user_icon from "../../Assets/person.png";
import email_icon from "../../Assets/email.png";
import password_icon from "../../Assets/password.png";

import FormElement from './FormElement';

export const Signup = () => {
  const [action, setAction] = useState("Sign Up");
  // Create a reusable form element
  return (
    <div className="container">
      <form>
        <div className="header">
          <div className="text">Signup</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          <FormElement
            imgSrc={user_icon}
            inputType="text"
            inputName="user_name"
            inputPlaceholder="Enter your username"
          />
          <FormElement
            imgSrc={email_icon}
            inputType="text"
            inputName="user_email"
            inputPlaceholder="Email address"
          />
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
          <div className="link-to-container">
            <div className="link-to-login">
              Already have an account? {" "}
              <Link to="/login">Log in</Link>
            </div>
          </div>
          <div className="submit-container">
            <div
              className={action === "Login" ? "submit gray" : "submit"}
              onClick={() => {
                setAction("Sign Up");
              }}
            >
              Sign Up
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
