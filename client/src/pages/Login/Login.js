import React from 'react';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles['login-page']}>
      <GoogleLogin />
    </div>
  );
};

export default Login;
