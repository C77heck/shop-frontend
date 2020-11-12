import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import NavLinks from './NavLinks'
import MainHeader from './MainHeader'
import SideDrawer from './SideDrawer'
import Backdrop from '../UIElements/Backdrop'

import './NavigationBar.css'

const NavigationBar = () => {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const closeDrawerHandler = e => {
        if (e.target.name === 'search' || e.target.name === 'search-button') {

        } else {
            setIsDrawerOpen(false)
        }
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
                    <Link to='/'>Furuma</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    )

}


export default NavigationBar;
