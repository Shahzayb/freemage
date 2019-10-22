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
    pageStart: null
  };

  componentDidMount() {
    this.setState({ pageStart: this.props.pageStart });
  }

  loadImages(page) {
    this.props.fetchNext(page);
  }

  render() {
    return Number.isInteger(this.state.pageStart) ? (
      <InfiniteScroll
        pageStart={this.state.pageStart}
        hasMore={this.props.hasMore}
        loadMore={this.loadImages.bind(this)}
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
            {this.props.images.map(obj => (
              <div key={obj._id}>
                <Link
                  to={{
                    pathname: `/images/${obj._id}`,
                    state: { modal: true }
                  }}>
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={obj.src}
                    srcSet={obj.srcset}
                    sizes="(min-width: 992px) 34vw,
                           (max-width: 992px) 50vw,
                           (max-width: 768px) 100vw"
                    alt=""
                  />
                </Link>
              </div>
            ))}
          </Masonry>
        </div>
      </InfiniteScroll>
    ) : null;
  }
}

export default Gallery;
