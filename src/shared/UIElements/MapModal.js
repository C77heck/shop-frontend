import React from 'react';

import Modal from './Modal';


import './MapModal.css';

const MapModal = props => {
    return (

        <Modal
            onCancel={props.onClear}
            show={!!props.show}
            footerClass={props.footerClass}
            className={props.className}
        >
            {props.children}
        </Modal>

    )
}


export default MapModal;