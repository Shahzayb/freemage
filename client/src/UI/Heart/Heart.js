import React from 'react';
import { ReactComponent as HeartIcon } from '../../assets/images/heart.svg';
import styles from './Heart.module.css';

const Heart = props => {
  const classes = `${styles.Heart} ${props.like && styles.HeartLike}`;
  const title = props.like ? 'unlike' : 'like';
  const width = props.width || null;
  const height = props.height || null;
  const style = {
    width,
    height
  };
  return (
    <HeartIcon
      onClick={props.onClick}
      title={title}
      style={style}
      className={classes}
    />
  );
};

export default Heart;
