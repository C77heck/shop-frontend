import React from 'react';

import Modal from './Modal';
import Button from './Button';

import './ErrorModal.css';

const ErrorModal = props => {
  return (
    <Modal
      className='error-modal'
      headerStyle={{ backgroundColor: "rgb(250, 102, 3)" }}
      onCancel={props.onClear}
      show={!!props.error}
      footer={<Button
        style={{ backgroundColor: "rgb(250, 102, 3)", border: "none" }}
        onClick={props.onClear}
      >Okay</Button>}
      style={props.style}
    >
      <p style={{ fontSize: "1.5rem" }}>{props.errorMessage || props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
