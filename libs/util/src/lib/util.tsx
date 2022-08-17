import _ from 'lodash';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const Modal = ({ children }: { children: React.ReactNode }) => {
  const el = React.useRef(document.createElement('div'));
  useEffect(() => {
    if (_.isNull(modalRoot)) {
      return;
    }
    modalRoot.appendChild(el.current);
    return () => {
      modalRoot.removeChild(el.current);
    };
  }, []);
  return ReactDOM.createPortal(children, el.current);
};

export default Modal;
