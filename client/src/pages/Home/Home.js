import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchHomeImages } from '../../actions/home';
import Hero from '../../components/Hero/Hero';
import Gallery from '../../components/Gallery/Gallery';
import css from './Home.module.css';

const Home = props => {
  return (
    <>
      <Helmet>
        <title>Welcome to Freemage</title>
        <meta name="description" content="It's an online image sharing app where artists, painters and designers show their work" />
      </Helmet>
      <Hero />
      <h1 className={css.Heading}>Recent Images</h1>
      <hr />
      <Gallery
        curPage={props.pagination.curPage}
        hasMore={props.pagination.hasMore}
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
