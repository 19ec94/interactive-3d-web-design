import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'

import "./Profile.css"

export const ProfileField = ({ labelContent, value, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    onUpdate(editedValue);// send data to server to be updated
    setIsEditing(false);
  };

  return (
    <div className="profile-field">
      <label>{labelContent}</label>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedValue}
            onChange={(e)=>setEditedValue(e.target.value)}
          />
          <button onClick={handleUpdateClick}>Update</button>
        </>
      ) : (
        <>
          <span>{editedValue}</span>
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
};

export const Profile = () => {
  // get the user data from sessionStorage
  const sessionData = JSON.parse(sessionStorage.getItem("sessionData"));

  const [userName, setUserName] = useState(sessionData.userName);
  const [userEmail, setUserEmail] = useState(sessionData.userEmail);
  const [userPassword, setUserPassword] = useState("*****");

  const handleUserNameUpdate = (newUserName) => {
    //TODO: Send DATA to server
    setUserName(newUserName);
  };
  const handleUserEmailUpdate = (newUserEmail) => {
    //TODO: Send DATA to server
    setUserEmail(newUserEmail);
  };
  const handleUserPasswordUpdate = (newUserPassword) => {
    //TODO: Send DATA to server
    setUserPassword(newUserPassword);
  };
  return (
    <div className="profile">

      <div className="title">
        Profile
      </div>

      <div className="profile-fields">
        <ProfileField 
          labelContent={<FontAwesomeIcon icon={ faUser }/>}
          value={userName}
          onUpdate={handleUserNameUpdate}
        />
        <ProfileField 
          labelContent={ <FontAwesomeIcon icon={ faEnvelope} /> }
          value={userEmail}
          onUpdate={handleUserEmailUpdate}
        />
        <ProfileField 
          labelContent={ <FontAwesomeIcon icon={ faLock } /> }
          value={userPassword}
          onUpdate={handleUserPasswordUpdate}
        />
      </div>

    </div>
  );
}
