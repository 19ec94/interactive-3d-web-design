import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from 'axios'


import "./Login.css";
import user_icon from "../../Assets/person.png";
import password_icon from "../../Assets/password.png";
import { PasswordIdent } from "../PasswordIdent";

import FormElement from './FormElement';


export const Login = () => {

  // Initialise variable state to empty string
  const [formData, setFormData] = useState({
    user_name: '',
    user_password:'',
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    setFormData({ ...formData, 
      [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    /*TODO:Implement comprehensive form validation using any framework!*/
    if (!formData.user_name){
      setError('Provide a valid username!');
      return;
    }
    if (!formData.user_password){
      setError('Provide a valid password!');
      return;
    }

    try{
      console.log('Data to be send', formData);
      await axios.post('/login', formData)
      console.log('Form submitted Sucessfully!');
    }catch (error) {
      /* debugging */
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
          <div className="text">Login</div>
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
            imgSrc={password_icon}
            inputType="password"
            inputName="user_password"
            inputValue={formData.user_password}
            inputPlaceholder="Enter your password"
            inputOnChange={handleChange}
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
            {error && <p style={{color:'red'}}>{error}</p>}
            <button type="submit" className="submit" >
              Log in
            </button>
          </div>
        </div>
      </form>
    </div> /* form container */
  );
};
