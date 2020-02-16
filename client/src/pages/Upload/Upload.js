import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Helmet } from 'react-helmet';

export class Upload extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      window.widget.open();
    }
  }

  render() {
    return this.props.isLoggedIn ? (
      <Helmet>
        <title>Freemage - upload image</title>
        <meta name="description" content="Upload your work" />
      </Helmet>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  userId: state.auth.userId,
  token: state.auth.token
});

export default connect(mapStateToProps)(Upload);
