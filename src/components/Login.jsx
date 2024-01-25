import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

import "./Login.css";
import user_icon from "../Assets/person.png";
import password_icon from "../Assets/password.png";

import FormElement from './FormElement';

import { useAuth } from './AuthContext';


export const Login = () => {
  const navigate = useNavigate();

  useEffect( () => {
    let isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn){
      navigate("/dashboard");
    }
  });

  // Initialise variable state to empty string
  const [formData, setFormData] = useState({
    user_name: '',
    user_password:'',
  });

  // Import global variables to update the login status
  const {setLoginStatus} = useAuth();

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
      console.log('Data to be sent', formData); //debugging
      // POST Login data
      const response = await axios.post('/user/login', formData)
      console.log(response); // debugging
      // Set error to empty string upon success
      setError('');
      // Update global variable on sucessful login
      setLoginStatus(true);
      navigate("/dashboard")
    }catch (error) {
      /*
       * Assuming the backend server sends the error message in the following 
       * format: { "status":"error", "data": {}, "error":{"code": 400, "message
       * ": "error message:}}
       */
      console.log('error', error); // debugging
      if (error.response.data.error.message){ // debugging
        setError(error.response.data.error.message);
      }
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
