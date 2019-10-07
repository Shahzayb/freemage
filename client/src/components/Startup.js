import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ensureLogin } from '../actions/auth';

export class Startup extends Component {
  componentDidMount() {
    this.props.ensureLogin();
  }

  render() {
    return this.props.children;
  }
}

const mapDispatchToProps = { ensureLogin };

export default connect(
  null,
  mapDispatchToProps
)(Startup);
