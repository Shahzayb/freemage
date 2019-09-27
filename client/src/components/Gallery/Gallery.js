import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import Masonry from 'react-masonry-css';
import './gallery.css';

const breakpointColumnsObj = {
  default: 3,
  992: 2,
  768: 1
};

export class Gallery extends Component {
  state = {
    images: []
  };

  loadImages(page) {
    console.log(page);
    const newImages = [];
    for (let i = 0; i < 5; i++) {
      newImages.push(
        `https://source.unsplash.com/random?sig=${Math.trunc(
          Math.random() * 5000
        )}`
      );
    }
    this.setState(state => {
      return { images: [...state.images, ...newImages] };
    });
  }

  render() {
    let items = this.state.images.map((imageUrl, i) => (
      <div key={i}>
        <Link to={{ pathname: `images/${i}`, state: { modal: true } }}>
          <img
            style={{
              width: '100%',
              height: '100%'
            }}
            src={imageUrl}
            alt=""
          />
        </Link>
      </div>
    ));

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadImages.bind(this)}
        hasMore={true}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }>
        <div className="grid-container">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {items}
          </Masonry>
        </div>
      </InfiniteScroll>
    );
  }
}

export default Gallery;
