import React from "react";

export const PasswordValid = (props) => {
  let password = props.password;
  const [meter, setMeter] = React.useState(false);

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
  const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
  const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
  const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
  const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
  const eightCharsOrMore = /.{8,}/g; // eight characters or more

  const passwordTracker = {
    uppercase: password.match(atLeastOneUppercase),
    lowercase: password.match(atLeastOneLowercase),
    number: password.match(atLeastOneNumeric),
    specialChar: password.match(atLeastOneSpecialChar),
    eightCharsOrGreater: password.match(eightCharsOrMore),
  };
  const passwordStrength = Object.values(passwordTracker).filter(
    (value) => value
  ).length;

  return (
    <div>
      {passwordStrength < 5 && "Must contain "}
      {!passwordTracker.uppercase && "uppercase, "}
      {!passwordTracker.lowercase && "lowercase, "}
      {!passwordTracker.specialChar && "special character, "}
      {!passwordTracker.number && "number, "}
      {!passwordTracker.eightCharsOrGreater && "eight characters or more"}
    </div>
  );
};
