import React, { Component } from 'react';
import Gallery from '../../components/Gallery/Gallery';

export class SearchImage extends Component {
  render() {
    return (
      <>
        <header>{/* show search term here */}</header>
        <Gallery />
      </>
    );
  }
}

export default SearchImage;
