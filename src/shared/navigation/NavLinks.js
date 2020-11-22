import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import MapModal from '../UIElements/MapModal';
import Map from '../UIElements/Map';
import AuthButton from '../../users/components/AuthButton';

import './NavLinks.css';

const NavLinks = () => {

    const [clicked, setClicked] = useState(false);

    const openMapHandler = e => {
        e.preventDefault();
        setClicked(true)
    }
    const cancel = () => {
        setClicked(false)
    }

    return (
        <React.Fragment>
            <MapModal
                footerClass={'modal__footer-colored'}
                className={'map-modal'}
                show={clicked}
                onClick={cancel}
                onClear={cancel}
            >
                <div className="map-container">
                    <Map />
                </div>
            </MapModal>

            <ul className="nav-links">
                <div className='nav-links__div'>
                    <li>
                        <NavLink to='/' exact>HOME</NavLink>
                    </li>
                    <li>
                        <NavLink to='/shopping' exact>GROCERIES</NavLink>
                    </li>
                    <li >
                        <NavLink to='/about' exact>ABOUT US</NavLink>
                    </li>
                    <li>
                        <a href='/' onClick={openMapHandler}>STORE FINDER</a>
                    </li>
                    <li>
                        <NavLink to='/contact' exact>CONTACT US</NavLink>
                    </li>
                </div>
                    <AuthButton
                        className='auth-button_desktop'
                    />
            
            </ul>
        </React.Fragment >
    )
}

export default NavLinks;

