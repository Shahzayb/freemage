import React, { Component } from 'react';
import Header from './Header';
import Gallery from './Gallery';
import { Route } from 'react-router-dom';
import { UploadModal } from './UploadModal';

export class Freemage extends Component {
  render() {
    return (
      <>
        <Route path="/" component={Header} />
        <Route path="/" component={Gallery} />
        <Route path="/upload" component={UploadModal} />
        {/* <Gallery /> */}
      </>
    );
  }
}

export default Freemage;
