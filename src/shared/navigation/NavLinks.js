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

import Input from '../form-elements/Input';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL,
    VALIDATOR_MIN
} from '../utility/validators';

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


    const [test, setTest] = useState({
        test: {
            value: '',
            valid: true
        },
        other: {
            value: '',
            valid: true
        }
    })
    /* preset values as per above */
    const [isValid, setIsValid] = useState(true)
    const validity = (e) => {

        if (test.length > 0) {
            setIsValid(true)

        } else {
            setIsValid(false)
        }
    }
    /* alternative validity check */
    const testHandler = e => {
        const attribute = e.target.attributes.getNamedItem('validators').value;
        console.table(attribute)
        /* with this above we can pass the validators to the hook though i need to figure a different way */
       /* probably just make the values into arrays as strings and iterate it to filter out the 
       corresponding values and then validate it in the hook */
        /* notice the syntax below and the way we validate it. */
        const { value, name } = e.target;
        setTest(prev => {
            return {
                ...prev,
                [name]: {
                    value: value,
                    valid: VALIDATOR_EMAIL(test.test.value)
                }
            }
        })
        //    validity();
        /* need to figure a way to insert the validation logic dynamically */
    }
    const [input, setInput] = useState({
        fName: '',
        lName: '',
        email: '',
        password: '',
        password2: '',
        phone: '',
        street: '',
        houseNumber: '',
        city: '',
        postCode: ''
    });

    const inputHandler = e => {
        const { name, value } = e.target;
        setInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
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
        console.log(test.test)
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
            if (input.password !== input.password2) {
                alert('add here some validitation...')
            } else {

                const responseData = await sendRequest(
                    process.env.REACT_APP_SIGNUP,
                    'POST',
                    JSON.stringify({
                        fullName: input.fName + ' ' + input.lName,
                        email: input.email,
                        password: input.password,
                        phone: input.phone,
                        address: input.street
                            + ' ' +
                            input.houseNumber
                            + ' ' +
                            input.city
                            + ', ' +
                            input.postCode
                    }),
                    { 'Content-Type': 'application/json' }
                )

                setCoordinates(responseData.userLocation)
                auth.signin(responseData.userId, responseData.token);
                setIsLoginMode(true)
                signInClose();
                setSignedup(true)
            }
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
                onChange={inputHandler}
                value={input}
                onSubmit={signin}
            >
                <Input
                    name='test'
                    onChange={testHandler}
                    value={test.test.value}
                    divClassName='input-control--invalid'
                    errorText='test the error message'
                    validators={VALIDATOR_MIN()}
                    type='text'
                    validity={test.test.valid}

                />
                <Input
                    validators={'VALIDATOR_required()'}
                    name='other'
                    onChange={testHandler}
                    value={test.other.value}
                    divClassName='input-control--invalid'
                    errorText='test the error message'
                    type='text'
                    validity={test.other.valid}

                />
            </Signin>
            <Signup
                header='Registering is quick and easy'
                show={registering}
                onClear={signInClose}
                onChange={inputHandler}
                value={input}
                onSubmit={signup}
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
        </React.Fragment>
    )
}

export default NavLinks;

