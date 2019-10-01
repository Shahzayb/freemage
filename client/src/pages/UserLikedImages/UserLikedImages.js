import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Gallery from '../../components/Gallery/Gallery';
import styles from './UserLikedImages.module.css';

const UserLikedImages = props => {
  return (
    <>
      <header>
        <Navbar />
        <div className={styles['profile']}>
          <img
            src="https://source.unsplash.com/random/200x200?profile"
            alt=""
            className={styles['rounded-thumb']}
          />
          <div className={styles['username']}>Shahzaib</div>
        </div>
      </header>
      <div className={styles['navbar']}>
        <NavLink
          exact
          activeStyle={{ color: '#000' }}
          className={styles['nav-link']}
          to="/shahzaib">
          Images
        </NavLink>
        <NavLink
          exact
          activeStyle={{ color: '#000' }}
          className={styles['nav-link']}
          to="/shahzaib/likes">
          Liked Images
        </NavLink>
      </div>
      <Gallery />
    </>
  );
};

export default UserLikedImages;
