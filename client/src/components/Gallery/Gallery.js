import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import './gallery.css';

const breakpointColumnsObj = {
  default: 3,
  992: 2,
  768: 1
};

export class Gallery extends Component {
  render() {
    let items = [];
    for (let i = 0; i < 50; i++) {
      items.push(
        <div>
          <Link
            key={i}
            to={{ pathname: `/image/${i}`, state: { modal: true } }}>
            <img
              style={{
                width: '100%',
                height: '100%'
              }}
              src={`https://source.unsplash.com/random?sig=${i}`}
              alt=""
            />
          </Link>
        </div>
      );
    }
    return (
      <div className="grid-container">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {items}
        </Masonry>
      </div>
    );
  }
}

export default Gallery;
