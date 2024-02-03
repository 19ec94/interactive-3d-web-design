import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

import "./Login.css";
import FormElement from './FormElement';
import { useAuth } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'

export const Signup = () => {
  const navigate = useNavigate();

  // Redirect logged in user to dashboard
  useEffect( () => {
    let isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn){
      navigate("/dashboard");
    }
  });

  // Initialise variable state to empty string
  const [formData, setFormData] = useState({
    user_name: '',
    user_email:'',
    user_password:'',
    user_password_repeat:''
  });

  const [error, setError] = useState('');

  // Import global variables to update the login status
  const {setLoginStatus} = useAuth();

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

    if (!formData.user_email){
      setError('Provide a valid email!');
      return;
    }

    if (!formData.user_password){
      setError('Provide a valid password!');
      return;
    }

    if (formData.user_password !== formData.user_password_repeat){
      setError('Password and re-entered password do not match!');
      return;
    }

    try{
      console.log('Data to be sent', formData);// debugging
      // POST Signup data
      const response = await axios.post('/user/signup', formData)
      console.log(response);// debugging
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
      if (error.response.data.error.message){
        setError(error.response.data.error.message);
      }
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
            labelContent={<FontAwesomeIcon icon={ faUser } />}
            inputType="text"
            inputName="user_name"
            inputValue={formData.user_name}
            inputPlaceholder="Enter your username"
            inputOnChange={handleChange}
          />
          <FormElement
            labelContent={ <FontAwesomeIcon icon={ faEnvelope } /> }
            inputType="text"
            inputName="user_email"
            inputValue={formData.user_email}
            inputPlaceholder="Enter your email address"
            inputOnChange={handleChange}
          />
          <FormElement
            labelContent={ <FontAwesomeIcon icon={ faLock } /> }
            inputType="password"
            inputName="user_password"
            inputValue={formData.user_password}
            inputPlaceholder="Enter your password"
            inputOnChange={handleChange}
          />
          <FormElement
            labelContent={ <FontAwesomeIcon icon={ faLock } /> }
            inputType="password"
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
            {error && <p style={{color:'red'}}>{error}</p>}
            <button type="submit" className="submit" >
              Sign up
            </button>
          </div>
        </div>
      </form>
    </div> /* form-container */
  );
};
