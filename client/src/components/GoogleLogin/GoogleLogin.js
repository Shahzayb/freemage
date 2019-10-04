import React from 'react';
import GoogleLogin from 'react-google-login';
import css from './GoogleLogin.module.css';

export default props => {
  // in future this will dispatch login action
  const responseGoogle = async authResult => {
    try {
      if (authResult['code']) {
        console.log(responseGoogle);
      } else {
        // There was an error.
        throw new Error('cannot retrieve authorization code');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1 className={css.LoginHeading}>
        Click this button to signin or signup with google
      </h1>
      <GoogleLogin
        clientId="222646766650-gqnkmntgaf988iqc2adh61rnge1310q8.apps.googleusercontent.com"
        buttonText="Login with Google"
        responseType="code"
        redirectUri="postmessage"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};
