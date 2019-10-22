import React, { Component } from 'react';

export default function withInsideModal(WrappedComponent) {
  return class extends Component {
    previousLocation = this.props.location;

    render() {
      const { location } = this.props;
      const inModal =
        (!!(location.state && location.state.modal) &&
          !(window.innerWidth <= 767) &&
          this.props.history.action !== 'POP') ||
        this.props.location.pathname === '/upload';

      if (!inModal) {
        this.previousLocation = location;
      }

      return (
        <WrappedComponent
          {...this.props}
          inModal={inModal}
          previousLocation={this.previousLocation}
        />
      );
    }
  };
}
