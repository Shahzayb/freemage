import React, { Component } from 'react';
import Hero from './Hero/Hero';
import Gallery from './Gallery/Gallery';
import { Route } from 'react-router-dom';

export class Freemage extends Component {
  render() {
    return (
      <>
        <Route path="/" component={Hero} />
        <Route path="/" component={Gallery} />
      </>
    );
  }
}

export default Freemage;
