import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <div className={styles['hero']}>
      <div className={styles['landing-text']}>
        The best free stock photos shared by talented creators.
      </div>
    </div>
  );
};

export default Hero;
