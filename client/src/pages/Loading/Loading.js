import React from 'react';
import Spinner from '../../UI/Spinner';
import css from './Loading.module.css';

const Loading = () => {
  const spinnerProps = {
    color: '#3cb46e',
    type: 'Grid'
  };
  return (
    <div className={css.LoadingPage}>
      <Spinner {...spinnerProps} />
    </div>
  );
};

export default Loading;
