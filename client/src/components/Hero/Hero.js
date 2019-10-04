import React from 'react';
import css from './Hero.module.css';

const Hero = () => {
  return (
    <div className={css.Hero}>
      <div className={css.LandingText}>
        The best free stock photos shared by talented creators.
      </div>
    </div>
  );
};

export default Hero;
