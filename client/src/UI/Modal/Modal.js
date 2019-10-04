import React from 'react';
import ReactDOM from 'react-dom';
import css from './Modal.module.css';

export const Modal = props => {
  function onCloseHandle(e) {
    e.stopPropagation();

    props.history.goBack();
  }

  return ReactDOM.createPortal(
    <>
      <div className={css.Overlay} onClick={onCloseHandle}>
        <div className={css.CloseBtn} title="close" onClick={onCloseHandle}>
          &times;
        </div>
        <div onClick={e => e.stopPropagation()} className={css.Modal}>
          {props.children}
        </div>
      </div>
    </>,
    document.querySelector('#modal')
  );
};

export default Modal;
