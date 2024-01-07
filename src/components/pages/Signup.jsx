import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";
import user_icon from "../../Assets/person.png";
import email_icon from "../../Assets/email.png";
import password_icon from "../../Assets/password.png";

import FormElement from './FormElement';

export const Signup = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
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
            inputPlaceholder="Enter your email address"
          />
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
            inputPlaceholder="Re-enter your password"
          />
          <div className="link-to-container">
            <div className="link-to-login">
              Already have an account? {" "}
              <Link to="/login">Log in</Link>
            </div>
          </div>
          <div className="submit-container">
            <button type="submit" className="submit" >
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
