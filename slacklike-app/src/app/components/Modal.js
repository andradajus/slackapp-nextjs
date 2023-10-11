// Modal.js

import React from 'react';

const Modal = ({ isOpen, onClose, message }) => (
  isOpen && (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  )
);

export default Modal;
