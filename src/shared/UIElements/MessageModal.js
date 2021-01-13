import React from 'react';

import Modal from './Modal';

import './MessageModal.css'

const MessageModal = props => {
    return (
        <Modal
            className={`message-modal ${props.className}`}
            onCancel={props.onClear}
            header={props.header}
            show={!!props.message}
        >
            <h2>{props.message}</h2>
            {props.children}
        </Modal>
    );
};

export default MessageModal;