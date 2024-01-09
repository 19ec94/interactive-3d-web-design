import React from "react";

export const PasswordIdent = (props) => {
  let password = props.password;
  let password2 = props.password2;

  console.log(password === password2);
  return (
    <div>
      {password === password2 ? (
        <div></div>
      ) : (
        <div> Password not identical</div>
      )}
    </div>
  );
};
