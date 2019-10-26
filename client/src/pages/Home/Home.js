import React from 'react';
import { connect } from 'react-redux';
import { fetchHomeImages } from '../../actions/home';
import Hero from '../../components/Hero/Hero';
import Gallery from '../../components/Gallery/Gallery';

const Home = props => {
  return (
    <>
      <Hero />
      <Gallery
        {...props}
        hasMore={props.pagination.hasMore}
        pageStart={props.pagination.curPage}
        fetchNext={props.fetchHomeImages}
        images={props.images}
      />
    </>
  );
};

const mapStateToProps = state => ({
  images: state.home.images,
  pagination: state.home.pagination
});

const mapDispatchToProps = { fetchHomeImages };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
