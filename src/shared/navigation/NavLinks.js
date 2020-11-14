import React, { useState, useContext } from 'react';

import { AuthContext } from '../context/auth-context';
import { NavLink } from 'react-router-dom';
import MapModal from '../UIElements/MapModal';
import Map from '../UIElements/Map';
import Signin from '../../users/components/Signin';
import Signup from '../../users/components/Signup';
import { useHttpClient } from '../hooks/http-hook';
import ErrorModal from '../UIElements/ErrorModal';
import LoadingSpinner from '../UIElements/LoadingSpinner';

import './NavLinks.css';

const NavLinks = () => {

    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(false)
    const { error, clearError, isLoading, sendRequest } = useHttpClient();
    const [registering, setRegistering] = useState(false);
    const [clickedSignIn, setClickedSignIn] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [input, setInput] = useState({
        fName: '',
        lName: '',
        email: '',
        password: ''
    })

    const inputHandler = e => {
        const { name, value } = e.target;
        console.log(name + ' ' + value)
        setInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const signinModalHandler = () => { setClickedSignIn(true) }
    const signout = () => {
        setIsLoginMode(false)//figure how to actually signout
        auth.signout();
    }
    const signInClose = () => {
        setClickedSignIn(false)
        setRegistering(false)
    }
    const signin = async e => {
        e.preventDefault();
        console.log(e.currentTarget)

        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_SIGNIN,
                'POST',
                JSON.stringify(input),
                { 'Content-Type': 'application/json' }
            )
            auth.signin(responseData.userId, responseData.token)
            setIsLoginMode(true)
            signInClose();
        } catch (err) {

        }
    }

    const register = () => {
        setClickedSignIn(false)
        setRegistering(true)

    }
    const signup = async e => {
        e.preventDefault();
        try {
            console.table(JSON.stringify(input))
            const responseData = await sendRequest(
                process.env.REACT_APP_SIGNUP,
                'POST',
                JSON.stringify({
                    fName: input.fName,
                    lName: input.lName,
                    email: input.email,
                    password: input.password,
                    address: '20 W 34th St, New York, NY 10001, United States'
                }),
                { 'Content-Type': 'application/json' }
            )
            auth.signin(responseData.userId, responseData.token);
            setIsLoginMode(true)
            signInClose();
        } catch (err) {

        }
    }

    const openMapHandler = () => {
        setClicked(true)
    }
    const cancel = () => {
        setClicked(false)
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
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
            <Signin
                header='login required'
                show={clickedSignIn}
                onClear={signInClose}
                register={register}
                onChange={inputHandler}
                value={input}
                onSubmit={signin}

            />
            <Signup
                header='Registering is quick and easy'
                show={registering}
                onClear={signInClose}
                onChange={inputHandler}
                value={input}
                onSubmit={signup}
            />
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
                        <a onClick={openMapHandler}>STORE FINDER</a>
                    </li>
                    <li>
                        <NavLink to='/contact' exact>CONTACT US</NavLink>
                    </li>
                </div>
                <div className='auth-container'>
                    {isLoginMode ? <button onClick={signout}>
                        <img src="/images/icons/user-other.svg" alt="user icon" />
                        <span>SIGN OUT</span>
                    </button>
                        :
                        <button onClick={signinModalHandler}>
                            <img src="/images/icons/user-other.svg" alt="user icon" />
                            <span>SIGN IN</span>
                        </button>}
                </div>
            </ul>
        </React.Fragment>
    )
}

export default NavLinks;

