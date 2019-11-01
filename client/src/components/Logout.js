import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingPage from '../pages/Loading/Loading';
import { logoutUser } from '../actions/auth';

const Logout = props => {
  if (props.isLoggedIn) {
    props.logoutUser();
    return <LoadingPage />;
  } else {
    return <Redirect to="/" />;
  }
};

const mapStateToProps = state => ({ isLoggedIn: state.auth.isLoggedIn });

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
