import React from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';
import { loginUser } from '../../actions/auth';
import css from './Login.module.css';
import { connect } from 'react-redux';

const Login = props => {
  const head = <Helmet>
        <title>Freemage Login</title>
        <meta name="description" content="Login to freemage and start uploading your work" />
      </Helmet>
  return props.isLoggedIn ? (
    <>
    {head}
    <Redirect to="/" />
    </>
  ) : (
    <div className={css.LoginPage}>
      {head}
      <GoogleLogin loginUser={props.loginUser} />
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn
});

const mapDispatchToProps = { loginUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
