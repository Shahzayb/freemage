import React from 'react';
import styles from './Modal.module.css';

export const Modal = props => {
  function onCloseHandle(e) {
    e.stopPropagation();
    if (
      e.target.classList.contains(styles['overlay']) ||
      e.target.classList.contains(styles['closeBtn'])
    ) {
      props.history.goBack();
    }
  }

  return (
    <>
      <div className={styles['overlay']} onClick={onCloseHandle}>
        <div
          className={styles['closeBtn']}
          title="close"
          onClick={onCloseHandle}>
          &times;
        </div>
        <div className={styles['modal']}>{props.children}</div>
      </div>
    </>
  );
};

export default Modal;
