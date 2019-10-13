import React from 'react';
import { connect } from 'react-redux';
import { fetchHomeImages } from '../../actions/home';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Gallery from '../../components/Gallery/Gallery';

const Home = props => {
  return (
    <>
      <header>
        <Navbar />
        <Hero />
      </header>
      <Gallery
        hasMore={props.pagination.hasMorePage}
        pageStart={props.pagination.curPage}
        fetchNext={props.fetchHomeImages}
        images={props.images}
      />
    </>
  );
};

const mapStateToProps = state => ({
  images: state.home,
  pagination: state.pagination.home
});

const mapDispatchToProps = { fetchHomeImages };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
