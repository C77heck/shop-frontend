import React from 'react';

import Modal from './Modal';
import Button from './Button';

const MessageModal = props => {
    return (
        <Modal
            onCancel={props.onClear}
            header={props.header}
            show={!!props.message}
            footer={<React.Fragment><Button onClick={props.yes}>Yes</Button> <Button onClick={props.no}>No</Button></React.Fragment>}
        >
            <p>{props.message}</p>
        </Modal>
    );
};

export default MessageModal;