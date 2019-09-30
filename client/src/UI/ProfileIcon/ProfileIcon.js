import React from 'react';
import RoundedThumb from '../RoundedThumb/RoundedThumb';
import styles from './ProfileIcon.module.css';

const ProfileIcon = () => {
  return (
    <div className={styles['profile']}>
      <RoundedThumb
        src={'https://source.unsplash.com/random/50x50'}
        alt=""
        width="3.2rem"
        height="3.2rem"
      />
      <div className={styles['username']}>Shahzaib</div>
    </div>
  );
};

export default ProfileIcon;
