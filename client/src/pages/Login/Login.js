import React from 'react';
import { Redirect } from 'react-router-dom';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';
import { loginUser } from '../../actions/auth';
import css from './Login.module.css';
import { connect } from 'react-redux';

const Login = props => {
  return props.isLoggedIn ? (
    <Redirect to="/" />
  ) : (
    <div className={css.LoginPage}>
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
