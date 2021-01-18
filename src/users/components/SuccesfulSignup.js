import React from 'react';

import Modal from '../../shared/UIElements/Modal';
import Map from '../../shared/UIElements/Map';

import './user.css'

const SuccesfulSignup = props => {


    return (
        <Modal
            className='succesful-signup'
            onCancel={props.onClear}
            show={!!props.show}
        >
            <h1>Succesful registration!</h1>
            <div className="map-container">
                <Map marker={props.marker} />
            </div>
        </Modal>
    )
}

export default SuccesfulSignup;