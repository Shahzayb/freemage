import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { error: false };

  static getDrivedStateFromError(error) {
    console.log(error);
    return { error: true };
  }

  render() {
    return this.state.error ? <div>Error</div> : this.props.children;
  }
}
