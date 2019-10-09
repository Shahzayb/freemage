import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from '../../UI/Spinner';
import Masonry from 'react-masonry-css';
import css from './Gallery.module.css';

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
    // future refector note : delegate image load to parent element
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
    // this will get removed in future
    let items = this.state.images.map((imageUrl, i) => (
      <div key={i}>
        <Link to={{ pathname: `/images/${i}`, state: { modal: true } }}>
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
        // will recieve pageStart from props
        pageStart={0}
        // refector : this.props.onImageLoad
        loadMore={this.loadImages.bind(this)}
        // refector : this.props.hasMoreImages
        hasMore={true}
        loader={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Spinner />
          </div>
        }>
        <div className={css.GridContainer}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={css.MyMasonryGrid}
            columnClassName={css.MyMasonryGridColumn}>
            {items}
            {/* future refector : {this.props.images} */}
          </Masonry>
        </div>
      </InfiniteScroll>
    );
  }
}

export default Gallery;
