import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

import "./Login.css";
import user_icon from "../../Assets/person.png";
import email_icon from "../../Assets/email.png";
import password_icon from "../../Assets/password.png";

import FormElement from './FormElement';

export const Signup = () => {
  // Initialise variable state to empty string
  const [formData, setFormData] = useState({
    user_name: '',
    user_email:'',
    user_password:'',
    user_password_repeat:''
  });
  const handleChange = (event) => {
    setFormData({ ...formData, 
      [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      console.log('Data to be send', formData);
      await axios.post('http://localhost:5000/signup', formData)
      console.log('Form submitted Sucessfully!');
    }catch (error) {
      if (error.response){
        console.log('error response data:', error.response.data);
        console.log('Status code:', error.response.status);
        console.log('Status text:', error.response.statusText);
        console.log('Status Headers:', error.response.headers);
      } else if (error.request) {
        console.log('No response received:', error.request);
      } else {
        console.log('error message', error.message);
      }
      console.log('error config', error.config);
    }
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
            inputValue={formData.user_name}
            inputPlaceholder="Enter your username"
            inputOnChange={handleChange}
          />
          <FormElement
            imgSrc={email_icon}
            inputType="text"
            inputName="user_email"
            inputValue={formData.user_email}
            inputPlaceholder="Enter your email address"
            inputOnChange={handleChange}
          />
          <FormElement
            imgSrc={password_icon}
            inputType="text"
            inputName="user_password"
            inputValue={formData.user_password}
            inputPlaceholder="Enter your password"
            inputOnChange={handleChange}
          />
          <FormElement
            imgSrc={password_icon}
            inputType="text"
            inputName="user_password_repeat"
            inputValue={formData.user_password_repeat}
            inputPlaceholder="Re-enter your password"
            inputOnChange={handleChange}
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
    </div> /* form-container */
  );
};
