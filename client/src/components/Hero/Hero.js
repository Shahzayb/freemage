import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './Hero.module.css';

const Hero = () => {
  return (
    <div className={css.Hero}>
      <div>
        <div className={css.LandingText}>
          The best free stock photos shared by talented creators.
        </div>
        <NavLink to="/login" className={`${css.PrimaryBtn} ${css.Mobile}`}>
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Hero;
