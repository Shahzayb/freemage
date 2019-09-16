import React from 'react';
import Button from '../../components/UI/Button';
import ImageZoomer from '../../components/UI/ImageZoomer/ImageZoomer';
import arrow from '../../assets/images/arrow-down.svg';
import './image.css';

const Image = props => {
  return (
    <>
      <header className="header">
        <Button title="Download" className="download-btn">
          <span id="text">Download free</span>
          <i id="symbol" className="arrow-down">
            <img src={arrow} alt="" />
          </i>
        </Button>
      </header>
      <ImageZoomer />
    </>
  );
};

export default Image;
