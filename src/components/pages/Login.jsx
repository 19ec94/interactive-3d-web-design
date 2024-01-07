import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";
import user_icon from "../../Assets/person.png";
import password_icon from "../../Assets/password.png";

import FormElement from './FormElement';


export const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="container">
      <form>
        <div className="header">
          <div className="text">Login</div>
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
            imgSrc={password_icon}
            inputType="text"
            inputName="user_password"
            inputPlaceholder="Enter your password"
          />
          <div className="link-to-container">
            <div className="link-to-signup">
              Don't have an account? {" "}
              <Link to="/signup">Sign up</Link>
            </div>
            <div className="link-to-reset-data">
              Forgot login details? {" "}
              <Link to="/forgot">Reset login details</Link>
            </div>
          </div>
          <div className="submit-container">
            <button type="submit" className={"submit"} >
              Log in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
