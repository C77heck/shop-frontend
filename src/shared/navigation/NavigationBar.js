import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';

import AdminSignin from '../../admin/components/AdminSignin';
import NavLinks from './NavLinks'
import MainHeader from './MainHeader'
import SideDrawer from './SideDrawer'
import Backdrop from '../UIElements/Backdrop'
import AuthButton from '../../users/components/AuthButton';
import MenuIcon from './MenuIcon';


import './NavigationBar.css'


const NavigationBar = () => {

    const { location } = useHistory();

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const closeDrawerHandler = e => {
        if (e.target.id === 'store-finder' || e.target.id === 'register') {

        } else {
            setIsDrawerOpen(false)
        }
    }
    const openDrawerHandler = () => { setIsDrawerOpen(true) }

    return (
        <React.Fragment>
            {isDrawerOpen && <Backdrop className={'backdrop-invisible'} onClick={closeDrawerHandler} />}
        
        <div className='nav-bar__wrapper'>

            <SideDrawer show={isDrawerOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <MenuIcon />
                </button>
                <h1 className="main-navigation__title">
                    <div>Furuma</div>
                </h1>
                {location.pathname === '/admin' ? <AdminSignin className='admin-auth__mobile' />
                    :
                    <AuthButton
                        className='auth-button_mobile'
                    />}
                <nav className="main-navigation__header-nav">
                    <NavLinks pathname={location.pathname} />
                </nav>

            </MainHeader>
</div>
        </React.Fragment>
    )

}


export default NavigationBar;
