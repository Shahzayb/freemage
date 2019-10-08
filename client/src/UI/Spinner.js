import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Spinner = props => {
  return (
    <Loader
      type={props.type || 'Grid'}
      color={props.color || '#3cb46e'}
      height={props.height || 100}
      width={props.width || 100}
      timeout={props.timeout || 0}
    />
  );
};

export default Spinner;
