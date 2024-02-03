import React from "react";

import "./Dashboard.css";
import  { Profile } from "./Profile";
import  { Games } from "./Games";

export const Dashboard = () => {
  return (
    <div className="dashboard">

      <div className="dashboard__header">
        <div className="dashboard__title">
          Dashboard
        </div>
        <div className="dashboard__underline">
        </div>
      </div>

      {/* Profile component */}
      <Profile />

      {/* TODO Game component */}
      <Games />

      {/* TODO Logout */}
      <div className="dashboard__header">
       Logout button here
      </div>

    </div>
  );
};
