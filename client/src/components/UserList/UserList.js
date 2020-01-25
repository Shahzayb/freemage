import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Spinner from '../../UI/Spinner';
import sadFaceIcon from '../../assets/images/sad-face.png';
import Masonry from 'react-masonry-css';
import css from './UserList.module.css';

const breakpointColumnsObj = {
  default: 3,
  992: 2,
  768: 1
};

export class UserList extends Component {
  loadMore(page) {
    this.props.fetchNext(this.props.curPage + 1);
  }

  render() {
    if (this.props.users.length === 0 && this.props.hasMore === false) {
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
            key="loader"
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
            {this.props.users.map(obj => (
              <div key={obj._id}>
                <Link
                  to={{
                    pathname: `/users/${obj._id}`
                  }}
                >
                  <div>
                    <img alt={obj.name} src={obj.profilePic} />
                    <p>{obj.name}</p>
                  </div>
                </Link>
              </div>
            ))}
          </Masonry>
        </div>
      </InfiniteScroll>
    );
  }
}

export default UserList;
