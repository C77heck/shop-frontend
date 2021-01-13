import React, { useState, useContext } from 'react';

import { NavLink, useHistory } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';
import MapModal from '../UIElements/MapModal';
import Map from '../UIElements/Map';
import AuthButton from '../../users/components/AuthButton';
import Auth from '../../users/components/Auth';
import DropDown from './DropDown';

import './NavLinks.css';
import AdminSignin from '../../admin/components/AdminSignin';
import { AdminContext } from '../context/admin-context';

const NavLinks = props => {

    const { isAdminLoggedIn } = useContext(AdminContext)


    const { location } = useHistory()

    const { userId } = useContext(AuthContext)

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
                {isLoggedIn && <React.Fragment><li className='mobile-view__my__account'>
                    <NavLink to={`/userdata/${userId}`} >UPDATE DETAILS</NavLink>
                </li>
                    <li className='mobile-view__my__account'>
                        <NavLink to={`/orderhistory/${userId}`} >ORDER HISTORY</NavLink>
                    </li>
                    <li className='mobile-view__my__account'>
                        <NavLink to={`/favourites/${userId}`}>FAVOURITES</NavLink>
                    </li></React.Fragment>}
                <li>
                    {isAdminLoggedIn ? <NavLink to='/admin' exact>ADMIN</NavLink>
                        :
                        isLoggedIn ?
                            <div className='desktop-view__my__account'>
                                <DropDown name='MY ACCOUNT' /></div>
                            :
                            location.pathname === '/admin' ? <div></div>
                                :
                                <Auth register={true} >
                                    <NavLink to='/' exact>REGISTER</NavLink>
                                </Auth>
                    }
                </li>
                {isAdminLoggedIn ? <AdminSignin className='admin-sigin__button' />
                    :
                    props.pathname === '/admin' ? <AdminSignin className='admin-sigin__button' />
                        :
                        <AuthButton
                            className='auth-button_desktop'
                        />}

            </ul>
        </React.Fragment>
    )
}

export default NavLinks;

