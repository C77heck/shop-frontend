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
import SuccesfulSignup from '../../users/components/SuccesfulSignup';


import { useInput } from '../hooks/form-hook';

import './NavLinks.css';

const NavLinks = () => {

    const auth = useContext(AuthContext);

    const [isLoginMode, setIsLoginMode] = useState(false)
    const { error, clearError, isLoading, sendRequest } = useHttpClient();
    const [registering, setRegistering] = useState(false);
    const [clickedSignIn, setClickedSignIn] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [signedup, setSignedup] = useState(false);
    const [coordinates, setCoordinates] = useState();

    const [inputState, handler] = useInput({
        fName: {
            value: '',
            valid: true
        },
        surname: {
            value: '',
            valid: true
        },
        email: {
            value: '',
            valid: true
        },
        password: {
            value: '',
            valid: true
        },
        passwordAgain: {
            value: '',
            valid: true
        },
        phone: {
            value: '',
            valid: true
        },
        city: {
            value: '',
            valid: true
        },
        street: {
            value: '',
            valid: true
        },
        postCode: {
            value: '',
            valid: true
        },
        houseNumber: {
            value: '',
            valid: true
        },
    })

    console.table(inputState.inputs)

    const signinModalHandler = () => { setClickedSignIn(true) }
    const signout = () => {
        setIsLoginMode(false)
        auth.signout();
    }

    const signInClose = () => {
        setClickedSignIn(false)
        setRegistering(false)
    }

    const signin = async e => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_SIGNIN,
                'POST',
                JSON.stringify({
                    email: inputState.inputs.email.value,
                    password: inputState.inputs.password.value
                }),
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
            const responseData = await sendRequest(
                process.env.REACT_APP_SIGNUP,
                'POST',
                JSON.stringify({
                    fullName: inputState.inputs.fName.value
                        + ' ' +
                        inputState.inputs.surname.value,
                    email: inputState.inputs.email.value,
                    password: inputState.inputs.password.value,
                    phone: inputState.inputs.phone.value,
                    address: inputState.inputs.street.value
                        + ' ' +
                        inputState.inputs.houseNumber.value
                        + ' ' +
                        inputState.inputs.city.value
                        + ', ' +
                        inputState.inputs.postCode.value
                }),
                { 'Content-Type': 'application/json' }
            )
            setCoordinates(responseData.userLocation)
            auth.signin(responseData.userId, responseData.token);
            setIsLoginMode(true)
            signInClose();
            setSignedup(true)
        } catch (err) {

        }
    }

    const openMapHandler = () => {
        setClicked(true)
    }
    const cancel = () => {
        setClicked(false)
    }

    const signedupSuccessToClose = () => {
        setSignedup(false)
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
                onSubmit={signin}
                onInput={handler}
                value={inputState.inputs}
            />
            <Signup
                header='Registering is quick and easy'
                show={registering}
                onClear={signInClose}
                onSubmit={signup}
                onInput={handler}
                value={inputState.inputs}
            />
            <SuccesfulSignup
                show={signedup}
                onClear={signedupSuccessToClose}
                marker={coordinates}
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
        </React.Fragment >
    )
}

export default NavLinks;

