import React, { Component } from 'react';
import { connect } from 'react-redux';
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

    return (
      <>
        <header className={css.Header}>
          <h1>
            Search result for :{'  '}
            <span className={css.BigText}>"{searchTerm}"</span>
          </h1>
        </header>
        <hr />
        <Gallery
          hasMore={searchData ? searchData.pagination.hasMore : true}
          fetchNext={this.loadImages.bind(this)}
          images={searchData ? searchData.images : []}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const searchTerm = ownProps.match.params.searchTerm.trim();
  return {
    searchTerm,
    searchData: state.search[searchTerm]
  };
};

const mapDispatchToProps = { searchImage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchImage);
