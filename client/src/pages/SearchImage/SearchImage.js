import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { searchImage } from '../../actions/search';
import Gallery from '../../components/Gallery/Gallery';
import css from './SearchImage.module.css';

export class SearchImage extends Component {
  loadImages(page) {
    const { searchTerm, searchImage } = this.props;
    searchImage(page, searchTerm);
  }

  render() {
    const { searchTerm, searchData } = this.props;
    const head = (
      <Helmet>
        <title>Freemage - Search image</title>
        <meta name="description" content="Search any image by their tags" />
      </Helmet>
    );

    return (
      <>
        {head}
        <header className={css.Header}>
          <h1>
            Search result for :{'  '}
            <span className={css.BigText}>"{searchTerm}"</span>
          </h1>
        </header>
        <nav className={css.Navbar}>
          <ul className={css.NavList}>
            <li>
              <NavLink
                exact
                activeClassName={css.NavLinkActive}
                className={css.NavLink}
                to={`/s/images/${searchTerm}`}
              >
                Images
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName={css.NavLinkActive}
                className={css.NavLink}
                to={`/s/users/${searchTerm}`}
              >
                Users
              </NavLink>
            </li>
          </ul>
        </nav>
        <hr />
        <Gallery
          curPage={searchData ? searchData.imagePagination.curPage : 0}
          hasMore={searchData ? searchData.imagePagination.hasMore : true}
          fetchNext={this.loadImages.bind(this)}
          images={searchData ? searchData.images : []}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const searchTerm = ownProps.match.params.searchTerm.trim();
  let searchData = state.search;

  if (searchData.imageSearchTerm !== searchTerm) {
    searchData = null;
  }
  return {
    searchTerm,
    searchData
  };
};

const mapDispatchToProps = { searchImage };

export default connect(mapStateToProps, mapDispatchToProps)(SearchImage);
