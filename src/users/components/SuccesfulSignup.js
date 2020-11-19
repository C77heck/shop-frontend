import React from 'react';

import { Link } from 'react-router-dom';

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
            <div className='profile-link' >
            <p>got to see <Link to='/profile'>my profile</Link></p>
                
            </div>
            <div className="map-container">
                <Map marker={props.marker} />
            </div>
        </Modal>
    )
}

export default SuccesfulSignup;