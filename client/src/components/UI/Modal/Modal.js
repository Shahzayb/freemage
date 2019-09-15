import React from 'react';
import './modal.css';

export const Modal = props => {
  function onCloseHandle(e) {
    e.stopPropagation();
    if (
      e.target.classList.contains('overlay') ||
      e.target.classList.contains('closeBtn')
    ) {
      props.history.goBack();
    }
  }

  return (
    <>
      <div className="overlay" onClick={onCloseHandle}>
        <div className="closeBtn" title="close" onClick={onCloseHandle}>
          &times;
        </div>
        <div className="modal">{props.children}</div>
      </div>
    </>
  );
};

export default Modal;
