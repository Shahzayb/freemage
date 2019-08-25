import React from 'react';
import Navbar from './Navbar';

const Header = () => {
  return (
    <header>
      <Navbar />
      <div className="hero">
        <div className="landing-text">
          The best free stock photos shared by talented creators.
        </div>
      </div>
    </header>
  );
};

export default Header;
