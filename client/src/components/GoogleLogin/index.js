import React from 'react';
import GoogleLogin from 'react-google-login';
import './index.css';

export default props => {
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
    <GoogleLogin
      clientId="222646766650-gqnkmntgaf988iqc2adh61rnge1310q8.apps.googleusercontent.com"
      render={renderProps => (
        <button
          className="login-btn"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}>
          Login
        </button>
      )}
      buttonText="Login"
      responseType="code"
      accessType="offline"
      redirectUri="postmessage"
      scope="openid email profile"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};
