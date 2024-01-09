import React, { useState } from "react";
import email_icon from "../../Assets/email.png";
import { Link } from "react-router-dom";
import FormElement from "./FormElement"

export const Forgot = () => {

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    user_email: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, 
      [event.target.name]: event.target.value });
  };


  const handleSubmit = async (event) => {

    event.preventDefault();

    // define form submission logic here
    console.log("Reset login credentials submitted!");

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
            <div className="text">An Email has been sent!</div>
          ): (
            <div className="text">Forgot Login details?</div>
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
                Log in</Link>
              </div>
              <div className="link-to-reset-data">
                Haven't received the Email yet? {" "}
                <Link to="/forgot"
                onClick={handleRetryReset}
                >
                Retry reset</Link>
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
            <div className="submit-container">
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
