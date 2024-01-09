import React, { useState } from "react";
import email_icon from "../../Assets/email.png";
import { Link } from "react-router-dom";

export const Forgot = () => {
  const [action, setAction] = useState("Forgot Password");
  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Forgot Password" ? (
          <div className="inputs">
            <div className="input">
              <img src={email_icon} alt="" />
              <input type="email" placeholder="Email" />
            </div>
            <div className="submit-container-reset">
              <div
                className={
                  action === "Forgot Password" ? "submit" : "submit hidden"
                }
                onClick={() => {
                  setAction("Email Sent Out");
                }}
              >
                Reset Password
              </div>
            </div>
          </div>
        ) : (
          <div className="inputs">
            <div className="password-submitted">
              Reset Submitted! Check Emails
            </div>
            <div className="submit-container-reset">
              <div
                className="submit"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Retry
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
