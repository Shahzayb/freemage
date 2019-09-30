import React from 'react';
import GoogleLogin from 'react-google-login';
import styles from './GoogleLogin.module.css';

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
    <div>
      <h1 className={styles['login-heading']}>
        Click this button to signin or signup with google
      </h1>
      <GoogleLogin
        clientId="222646766650-gqnkmntgaf988iqc2adh61rnge1310q8.apps.googleusercontent.com"
        buttonText="Login with Google"
        responseType="code"
        accessType="offline"
        redirectUri="postmessage"
        scope="openid email profile"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};
