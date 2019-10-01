import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button';
import ImageZoomer from '../../UI/ImageZoomer/ImageZoomer';
import arrow from '../../assets/images/arrow-down.svg';
import styles from './Image.module.css';

const Image = props => {
  return (
    <>
      <header className={styles['header']}>
        <Link to="/shahzaib" className={styles['profile']}>
          <img
            src="https://source.unsplash.com/random/200x200?profile"
            alt=""
            className={styles['rounded-thumb']}
          />
          <div className={styles['username']}>Shahzaib</div>
        </Link>
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
