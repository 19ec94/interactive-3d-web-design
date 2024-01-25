import React, { useState } from "react";
import email_icon from "../Assets/email.png";
import { Link } from "react-router-dom";
import FormElement from "./FormElement"

export const Forgot = () => {

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    user_email: '',
  });

  const [error, setError] = useState('');

  const handleChange = (event) => {
    setFormData({ ...formData, 
      [event.target.name]: event.target.value });
  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    /*TODO:Implement comprehensive form validation using any framework!*/
    if (!formData.user_email){
      setError('Provide a valid email address!');
      return;
    }

    // define form submission logic here
    try {
      console.log('Data to be send', formData);
      // await axios.post('/reset', formData)
      console.log("Reset login credentials submitted!");
    } catch (error) {
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

    setIsSubmitted(true);
  };

  const handleRetryReset = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="header">
          { isSubmitted ? (
            <div className="text">A reset-link has been sent to your email!</div>
          ): (
            <div className="text">Forgot login details?</div>
          )}
          <div className="underline"></div>
        </div> 
        { isSubmitted ? (
          <div className="inputs">
            <div className="link-to-container">
              <div className="link-to-signup">
                Found your login details? Proceed to {" "}
                <Link to="/login" 
                >
                  Log in</Link>.
              </div>
              <div className="link-to-reset-data">
                Haven't received the reset-link yet? Try {" "}
                <Link to="/forgot"
                  onClick={handleRetryReset}
                >
                  resetting login details</Link> {" "} again.
              </div>
            </div>
          </div>
        ) : (
          <div className="inputs">
            <FormElement
              imgSrc={email_icon}
              inputType="email"
              inputName="user_email"
              inputValue={formData.user_email}
              inputPlaceholder="Enter your Email"
              inputOnChange={handleChange}
            />
            <div className="link-to-container">
              <div className="link-to-signup">
                Found your login details? Proceed to {" "}
                <Link to="/login" 
                >
                  Log in</Link>.
              </div>
            </div>
            <div className="submit-container">
            {error && <p style={{color:'red'}}>{error}</p>}
              <button 
                type="submit" 
                className="submit" 
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </form>
    </div> 
  );
};
