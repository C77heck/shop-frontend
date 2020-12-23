import React, { useState, useContext } from 'react';

import { NavLink } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';
import MapModal from '../UIElements/MapModal';
import Map from '../UIElements/Map';
import AuthButton from '../../users/components/AuthButton';
import Auth from '../../users/components/Auth';

import './NavLinks.css';

const NavLinks = () => {

    const { isLoggedIn } = useContext(AuthContext);

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
                    <li>
                        <a href='/' onClick={openMapHandler}>STORE FINDER</a>
                    </li>
                    <li>
                        <NavLink to='/contact' exact>CONTACT US</NavLink>
                    </li>
                    <li >
                        {isLoggedIn ?
                            <NavLink to='/myaccount' exact>My Account</NavLink>
                            :
                            <Auth register={true} >
                                <NavLink to='/' exact>Register</NavLink>
                            </Auth>
                        }
                    </li>
                </div>
                <AuthButton
                    className='auth-button_desktop'
                />

            </ul>
        </React.Fragment>
    )
}

export default NavLinks;

