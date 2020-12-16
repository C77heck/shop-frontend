import React, { useContext, useState, useEffect } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Signin from './Signin';
import Signup from './Signup';
import SuccesfulSignup from './SuccesfulSignup';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import { useInput } from '../../shared/hooks/form-hook';




import './Auth.css'

const Auth = props => {

    const { isLoggedIn, signin } = useContext(AuthContext);

    const { error, clearError, isLoading, sendRequest } = useHttpClient();

    const [registering, setRegistering] = useState(false);
    const [clickedSignIn, setClickedSignIn] = useState(false);
    const [signedup, setSignedup] = useState(false);
    const [coordinates, setCoordinates] = useState();
    const [disabled, setDisabled] = useState(true)



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



    useEffect(() => {
        for (let i in inputState.inputs) {
            if (i.valid === true) {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
        }
    }, [inputState])


    const signinModalHandler = () => {
        setClickedSignIn(true)
    }

    const signInClose = () => {
        setClickedSignIn(false)
        setRegistering(false)

    }

    const signinHandler = async e => {
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
            signin(responseData.userId, responseData.token)
            signInClose();
        } catch (err) {

        }
    }

    const register = () => {
        setClickedSignIn(false)
        setRegistering(true)

    }
    const signedupSuccessToClose = () => {
        setSignedup(false)
    }
    const signupHandler = async e => {
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
            signin(responseData.userId, responseData.token);
            //   setIsLoginMode(true)
            signInClose();
            setSignedup(true)
        } catch (err) {

        }
    }

    return (
        <React.Fragment>

            {isLoading && <LoadingSpinner asOverlay />}
            <ErrorModal error={error} onClear={clearError} />

            <Signin
                header='login required'
                show={clickedSignIn}
                onClear={signInClose}
                register={register}
                onSubmit={signinHandler}
                onInput={handler}
                value={inputState.inputs}
            />
            <Signup
                header='Registering is quick and easy'
                show={registering}
                onClear={signInClose}
                onSubmit={signupHandler}
                onInput={handler}
                value={inputState.inputs}
                password={inputState.inputs.password.value}
                disabled={disabled}
            />
            <SuccesfulSignup
                show={signedup}
                onClear={signedupSuccessToClose}
                marker={coordinates}
            />
            <div onClick={!isLoggedIn ? signinModalHandler : undefined} >
                {props.children}
            </div>
        </React.Fragment>
    )


}


export default Auth;