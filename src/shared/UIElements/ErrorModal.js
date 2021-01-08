import React from 'react';

import Modal from './Modal';
import Button from './Button';

const ErrorModal = props => {
  return (
    <Modal
      onCancel={props.onClear}
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
      style={props.style}
    >
      <p style={{fontSize: "1.5rem"}}>{props.errorMessage || props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
