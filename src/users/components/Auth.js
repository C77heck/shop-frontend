import React, { useContext, useState, useEffect } from 'react';


import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useInput } from '../../shared/hooks/form-hook';

import Signin from './Signin';
import Signup from './Signup';
import SuccesfulSignup from './SuccesfulSignup';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import { encrypt } from '../../shared/utility/encrypt';
import PasswordResetter from '../../users/components/PasswordResetter';



import './Auth.css'

const Auth = props => {

    const { isLoggedIn, signin } = useContext(AuthContext);

    const { error, clearError, isLoading, sendRequest } = useHttpClient();

    const [registering, setRegistering] = useState(false);
    const [clickedSignIn, setClickedSignIn] = useState(false);
    const [forgottenPass, setForgottenPass] = useState(false)
    const [message, setMessage] = useState(true)
    const [signedup, setSignedup] = useState(false);
    const [coordinates, setCoordinates] = useState();
    const [disabled, setDisabled] = useState(true)



    const [inputState, handler] = useInput({
        fName: {
            value: '',
            valid: false
        },
        surname: {
            value: '',
            valid: false
        },
        email: {
            value: '',
            valid: false
        },
        password: {
            value: '',
            valid: false
        },
        passwordAgain: {
            value: '',
            valid: false
        },
        phone: {
            value: '',
            valid: false
        },
        city: {
            value: '',
            valid: false
        },
        street: {
            value: '',
            valid: false
        },
        postCode: {
            value: '',
            valid: false
        },
        houseNumber: {
            value: '',
            valid: false
        },
        answer: {
            value: '',
            valid: false
        }
    })
    const [question, setQuestion] = useState('')
    
    const onChangeHandler = e => {
        const value = e.target.value;
        if (value !== '0') {
            setQuestion(value)
        }
    }

    useEffect(() => {
        for (let i in inputState.inputs) {
            if (inputState.inputs[i].valid === false) {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
        }
        if (question === '') {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }, [inputState, question])


    const forgottenHandler = () => {
        setClickedSignIn(false)
        setForgottenPass(true)
    }

    const forgottenClose = () => {
        setForgottenPass(false)
        setMessage(true)
    }

    const signinModalHandler = () => {
        setClickedSignIn(true)
        setRegistering(false)

    }

    const signInClose = () => {
        setClickedSignIn(false)
        setRegistering(false)
        setForgottenPass(false)
    }
    const register = () => {
        setClickedSignIn(false)
        setRegistering(true)
        setForgottenPass(false)
    }

    const signedupSuccessToClose = () => {
        setSignedup(false)
    }

    const signinHandler = async e => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_SIGNIN,
                'POST',
                JSON.stringify({
                    email: inputState.inputs.email.value,
                    password: encrypt(inputState.inputs.password.value)
                }),
                { 'Content-Type': 'application/json' }
            )
            signin(responseData.userId, responseData.token)
            signInClose();
        } catch (err) {

        }
    }

    const signupHandler = async e => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_SIGNUP,
                'POST',
                JSON.stringify({
                    fullName: {
                        firstName: inputState.inputs.fName.value,
                        lastName: inputState.inputs.surname.value
                    },
                    email: inputState.inputs.email.value,
                    password: encrypt(inputState.inputs.password.value),
                    phone: inputState.inputs.phone.value,
                    address: {
                        city: inputState.inputs.city.value,
                        street: inputState.inputs.street.value,
                        postCode: inputState.inputs.postCode.value,
                        houseNumber: inputState.inputs.houseNumber.value
                    },
                    hint: question,
                    answer: inputState.inputs.answer.value
                }),
                { 'Content-Type': 'application/json' }
            )
            setCoordinates(responseData.userLocation)
            signin(responseData.userId, responseData.token);
            signInClose();
            setSignedup(true)
        } catch (err) {

        }
    }

    const passwordLinkHandler = async e => {
        e.preventDefault();
        try {
            await sendRequest(
                process.env.REACT_APP_RECOVERY,
                'POST',
                JSON.stringify({
                    email: inputState.inputs.email.value
                }),
                { 'Content-Type': 'application/json' }
            )
            setMessage(false)
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
            >
                <button
                    type='button'
                    onClick={forgottenHandler}
                    className='forgot-password'
                >forgot password?</button>
            </Signin>
            <PasswordResetter
                onClear={forgottenClose}
                show={forgottenPass}
                value={inputState.inputs.email.value}
                onInput={handler}
                onSubmit={passwordLinkHandler}
                message={message}
            />
            <Signup
                header='Registering is quick and easy'
                show={registering}
                onClear={signInClose}
                onSubmit={signupHandler}
                onChange={onChangeHandler}
                onInput={handler}
                value={inputState.inputs}
                password={inputState.inputs.password.value}
                disabled={disabled}
                cancelSignup={signinModalHandler}
            />

            <SuccesfulSignup
                show={signedup}
                onClear={signedupSuccessToClose}
                marker={coordinates}
            />

            {props.register ? <div onClick={!isLoggedIn ? register : undefined} >
                {props.children}
            </div> : <div onClick={!isLoggedIn ? signinModalHandler : undefined} >
                    {props.children}
                </div>}
        </React.Fragment>
    )


}


export default Auth;