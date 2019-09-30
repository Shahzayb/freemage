import React from 'react';
import Button from '../../UI/Button';
import ImageZoomer from '../../UI/ImageZoomer/ImageZoomer';
import ProfileIcon from '../../UI/ProfileIcon/ProfileIcon';
import arrow from '../../assets/images/arrow-down.svg';
import styles from './Image.module.css';

const Image = props => {
  return (
    <>
      <header className={styles['header']}>
        <ProfileIcon />
        <Button title="Download" className={styles['download-btn']}>
          <span id={styles['text']}>Download free</span>
          <i id={styles['symbol']} className={styles['arrow-down']}>
            <img src={arrow} alt="" />
          </i>
        </Button>
      </header>
      <ImageZoomer />
    </>
  );
};

export default Image;
