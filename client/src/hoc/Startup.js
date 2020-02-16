import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../pages/Loading/Loading';
import { ensureLogin } from '../actions/auth';

export class Startup extends Component {
  componentDidMount() {
    this.props.ensureLogin();
  }

  render() {
    return this.props.loading ? <Loading /> : this.props.children;
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading
});

const mapDispatchToProps = { ensureLogin };

export default connect(mapStateToProps, mapDispatchToProps)(Startup);
