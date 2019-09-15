import React from 'react';
import './thumb.css';

const Thumb = props => {
  return (
    <div className="thumb-container">
      <div className="thumb">
        <img src={props.src} alt={props.alt} />
      </div>
    </div>
  );
};

export default Thumb;
