import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import { withRouter } from 'react-router-dom';

export class UploadModal extends Component {
  onCloseModal = () => {
    this.props.history.push('/');
  };

  render() {
    console.log(this.props);
    return (
      <Modal center open={true} onClose={this.onCloseModal}>
        <h2>upload centered modal</h2>
      </Modal>
    );
  }
}

export default withRouter(UploadModal);
