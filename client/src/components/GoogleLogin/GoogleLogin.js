import React from 'react';
import GoogleLogin from 'react-google-login';
import css from './GoogleLogin.module.css';

export default props => {
  const successHandler = async authResult => {
    props.loginUser(authResult['code']);
  };

  const failureHandler = e => {
    console.log('Error', e);
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
        onSuccess={successHandler}
        onFailure={failureHandler}
      />
    </div>
  );
};
