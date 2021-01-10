import React, { useState } from 'react';


import NavLinks from './NavLinks'
import MainHeader from './MainHeader'
import SideDrawer from './SideDrawer'
import Backdrop from '../UIElements/Backdrop'
import AuthButton from '../../users/components/AuthButton';


import './NavigationBar.css'
import { useHistory } from 'react-router-dom';
import AdminSignin from '../../admin/components/AdminSignin';

const NavigationBar = () => {

    const history = useHistory()
    const { location } = history;

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const closeDrawerHandler = e => {
            setIsDrawerOpen(false)
    }
    const openDrawerHandler = () => { setIsDrawerOpen(true) }

    return (
        <React.Fragment>
            {isDrawerOpen && <Backdrop className={'backdrop-invisible'} onClick={closeDrawerHandler} />}
            <SideDrawer show={isDrawerOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={openDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <div>Furuma</div>
                </h1>
                {location.pathname === '/admin' ? <AdminSignin className='admin-signin__mobile' />
                    :
                    <AuthButton
                        className='auth-button_mobile'
                    />}
                <nav className="main-navigation__header-nav">
                    <NavLinks pathname={location.pathname} />
                </nav>

            </MainHeader>

        </React.Fragment>
    )

}


export default NavigationBar;
