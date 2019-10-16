import React from 'react';
import ReactDOM from 'react-dom';
import css from './Modal.module.css';

export const Modal = ({ component: Component, ...rest }) => {
  function onCloseHandle(e) {
    e.stopPropagation();

    rest.history.goBack();
  }

  return ReactDOM.createPortal(
    <>
      <div className={css.Overlay} onClick={onCloseHandle}>
        <div className={css.CloseBtn} title="close" onClick={onCloseHandle}>
          &times;
        </div>
        <div onClick={e => e.stopPropagation()} className={css.Modal}>
          <Component modal={true} {...rest} />
        </div>
      </div>
    </>,
    document.querySelector('#modal')
  );
};

export default Modal;
