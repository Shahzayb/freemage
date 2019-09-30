import React from 'react';
import styles from './RoundedThumb.module.css';

const RoundedThumb = props => {
  const style = {
    width: props.width || '25px',
    height: props.height || '25px',
    margin: props.margin || null
  };
  return (
    <div style={style} className={styles['rounded-thumb']}>
      <img src={props.src} alt={props.alt} />
    </div>
  );
};

export default RoundedThumb;
