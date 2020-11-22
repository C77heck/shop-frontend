import React, { useState, useContext } from 'react';

import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';
import NavLinks from './NavLinks'
import MainHeader from './MainHeader'
import SideDrawer from './SideDrawer'
import Backdrop from '../UIElements/Backdrop'
import AuthButton from './AuthButton';

import './NavigationBar.css'

const NavigationBar = () => {

   // const auth = useContext(AuthContext);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    //const [isLoginMode, setIsLoginMode] = useState(false)

    const closeDrawerHandler = e => {
        const { id } = e.target
        console.log(id)
        if (id === 'auth-button') {
            console.log('target hit')
        } else {
            setIsDrawerOpen(false)
        }
    }
    const openDrawerHandler = () => { setIsDrawerOpen(true) }
/*     const signinModalHandler = () => {
        setClickedSignIn(true)
    }
    const signout = () => {
        setIsLoginMode(false)
        auth.signout();
    } 
                    <AuthButton
        switch={isLoginMode}
        signout={signout}
        signin={signinModalHandler}
        className='auth-button_mobile'
    /> */
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
