import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import Gallery from '../../components/Gallery/Gallery';
import './home.css';

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
        <Hero />
      </header>
      <Gallery />
    </>
  );
};

export default Home;
