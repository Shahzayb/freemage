import React, { Component } from 'react';
import Gallery from '../../components/Gallery/Gallery';

export class SearchPhoto extends Component {
  render() {
    return (
      <>
        <header>{/* show search term here */}</header>
        <Gallery />
      </>
    );
  }
}

export default SearchPhoto;
