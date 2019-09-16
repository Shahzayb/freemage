import React, { Component } from 'react';

export default function withMobileSize(WrappedComponent) {
  return class extends Component {
    state = { isMobileSized: null };

    componentDidMount() {
      this.setState({ isMobileSized: window.innerWidth <= 767 });
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          isMobileSized={this.state.isMobileSized}
        />
      );
    }
  };
}
