import React from 'react';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';
import css from './Login.module.css';

const Login = () => {
  return (
    <div className={css.LoginPage}>
      <GoogleLogin />
    </div>
  );
};

export default Login;
