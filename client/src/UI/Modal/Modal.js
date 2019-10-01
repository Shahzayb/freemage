import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

export const Modal = props => {
  function onCloseHandle(e) {
    e.stopPropagation();

    props.history.goBack();
  }

  return ReactDOM.createPortal(
    <>
      <div className={styles['overlay']} onClick={onCloseHandle}>
        <div
          className={styles['closeBtn']}
          title="close"
          onClick={onCloseHandle}>
          &times;
        </div>
        <div onClick={e => e.stopPropagation()} className={styles['modal']}>
          {props.children}
        </div>
      </div>
    </>,
    document.querySelector('#modal')
  );
};

export default Modal;
