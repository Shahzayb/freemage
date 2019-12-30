import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Image from '../../UI/Image';
import Spinner from '../../UI/Spinner';
import sadFaceIcon from '../../assets/images/sad-face.png';
import Masonry from 'react-masonry-css';
import css from './Gallery.module.css';

const breakpointColumnsObj = {
  default: 3,
  992: 2,
  768: 1
};

export class Gallery extends Component {
  loadMore(page) {
    console.log('page', page, 'curPage', this.props.curPage);
    this.props.fetchNext(this.props.curPage + 1);
  }

  render() {
    if (this.props.images.length === 0 && this.props.hasMore === false) {
      return (
        <div className={css.NoContent}>
          <img alt="No content available" src={sadFaceIcon} />
        </div>
      );
    }

    return (
      <InfiniteScroll
        pageStart={this.props.curPage}
        hasMore={this.props.hasMore}
        loadMore={this.loadMore.bind(this)}
        loader={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem'
            }}
          >
            <Spinner type="TailSpin" color="#111" width={40} height={40} />
          </div>
        }
      >
        <div className={css.GridContainer}>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className={css.MyMasonryGrid}
            columnClassName={css.MyMasonryGridColumn}
          >
            {this.props.images.map(obj => (
              <div key={obj._id}>
                <Link
                  to={{
                    pathname: `/images/${obj._id}`,
                    state: { modal: true }
                  }}
                >
                  <Image
                    publicId={obj.publicId}
                    sizes="(min-width: 992px) 34vw,
                           (max-width: 992px) 50vw,
                           (max-width: 768px) 100vw"
                    alt={obj.tags.join(' ')}
                  />
                </Link>
              </div>
            ))}
          </Masonry>
        </div>
      </InfiniteScroll>
    );
  }
}

export default Gallery;
