import React from 'react';
import GoogleLogin from 'react-google-login';
import css from './GoogleLogin.module.css';

export default props => {
  // in future this will dispatch login action
  const responseGoogle = async authResult => {
    console.log(authResult);
    props.loginUser(authResult['code']);
  };

  return (
    <div>
      <h1 className={css.LoginHeading}>
        Click this button to signin or signup with google
      </h1>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Login with Google"
        responseType="code"
        redirectUri="postmessage"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  );
};
