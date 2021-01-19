import React, { useContext, useState } from 'react';

import { PurchaseContext } from '../../shared/context/purchase-context';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useInput } from '../../shared/hooks/form-hook';

import Signin from './Signin';
import Signup from './Signup';
import SuccesfulSignup from './SuccesfulSignup';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import { encrypt } from '../../shared/utility/encrypt';
import PasswordResetter from '../../users/components/PasswordResetter';



import './Auth.css'

const Auth = props => {

    const { isLoggedIn, signin } = useContext(AuthContext);
    const { saveToLocalStorage, basketContent } = useContext(PurchaseContext)


    const { error, clearError, isLoading, sendRequest } = useHttpClient();

    const [registering, setRegistering] = useState(false);
    const [clickedSignIn, setClickedSignIn] = useState(false);
    const [forgottenPass, setForgottenPass] = useState(false)
    const [message, setMessage] = useState('')
    const [signedup, setSignedup] = useState(false);
    const [coordinates, setCoordinates] = useState();



    const [inputState, handler, isFormValid] = useInput({
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


    const forgottenHandler = () => {
        setClickedSignIn(false)
        setForgottenPass(true)
    }

    const forgottenClose = () => {
        setForgottenPass(false)
        setMessage('')
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
            if (basketContent.products.length > 0
                &&
                basketContent.userId === responseData.userData.userId) {
                saveToLocalStorage(basketContent.products, basketContent.userId)
            } else {

                try {
                    const productsData = await sendRequest(process.env.REACT_APP_BACKEND)
                    saveToLocalStorage(productsData.products.map(i => {
                        let isFavourite = false;
                        if (responseData.userData.favourites.includes(i.id)) {
                            isFavourite = true;
                        }
                        return {
                            ...i,
                            number: 0,
                            totalPrice: 0,
                            dateFetched: new Date(),
                            isFavourite: isFavourite,
                            isSearched: false
                        }
                    }), responseData.userData.userId)
                    signin(responseData.userData)
                    signInClose();
                } catch (err) {
                    console.log(err)
                }
            }
        } catch (err) {
            console.log(err)
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
            setCoordinates(responseData.userData.userLocation)
            signin(responseData.userData);
            signInClose();
            setSignedup(true)
        } catch (err) {

        }
    }

    const passwordLinkHandler = async e => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_RECOVERY,
                'POST',
                JSON.stringify({
                    email: inputState.inputs.email.value
                }),
                { 'Content-Type': 'application/json' }
            );
            setMessage(responseData.message)
        } catch (err) {
            setForgottenPass(false)
        }

    }

    return (
        <React.Fragment>

            <ErrorModal error={error} onClear={clearError} />

            <Signin
                header='login required'
                show={clickedSignIn}
                onClear={signInClose}
                register={register}
                onSubmit={signinHandler}
                onInput={handler}
                value={inputState.inputs}
                disabled={isFormValid}
                isLoading={isLoading}
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
                disabled={inputState.inputs.email.valid}
                isLoading={isLoading}
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
                disabled={isFormValid}
                cancelSignup={signinModalHandler}
                isLoading={isLoading}
            />

            <SuccesfulSignup
                show={signedup}
                onClear={signedupSuccessToClose}
                marker={coordinates}
            />
            {props.register ? <div
                className={props.className}
                onClick={!isLoggedIn ? register : undefined}
            >
                {props.children}
            </div> : <div
                className={props.className}
                onClick={!isLoggedIn ? signinModalHandler : undefined}
            >
                    {props.children}
                </div>}
        </React.Fragment>
    )


}


export default Auth;