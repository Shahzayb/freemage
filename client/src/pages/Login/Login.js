import React from 'react';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';
import './login.css';

const Login = () => {
  return (
    <div className="login-page">
      <GoogleLogin />
    </div>
  );
};

export default Login;
