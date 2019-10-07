import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Gallery from '../../components/Gallery/Gallery';

export class SearchPhoto extends Component {
  render() {
    return (
      <>
        <header>
          <Navbar />
          {/* show search term here */}
        </header>
        <Gallery />
      </>
    );
  }
}

export default SearchPhoto;
