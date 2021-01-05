import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom'

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/utility/validators';

import Input from '../../shared/form-elements/Input';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useInput } from '../../shared/hooks/form-hook';
import Button from '../../shared/UIElements/Button';
import Modal from '../../shared/UIElements/Modal';
import { encrypt } from '../../shared/utility/encrypt';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/UIElements/ErrorModal';


import './PassRecovery.css';

const PasswordResetModal = props => {
    return (
        <Modal
            className=''
            onCancel={props.onClear}
            show={props.show}
        > <h2>Your password has been reset!</h2></Modal>
    )
}

const PassRecovery = () => {

    const history = useHistory()

    const { requestId } = useParams()
    const { sendRequest, error, clearError, isLoading } = useHttpClient()
    const [inputState, handler, isFormValid] = useInput({
        password: {
            value: '',
            valid: false
        },
        passwordAgain: {
            value: '',
            valid: false
        },
        answer: {
            value: '',
            valid: false
        }
    })

    const [show, setShow] = useState(false)
    const [hint, setHint] = useState('')


    useEffect(() => {
        if (hint === '') {
            (async () => {
                try {
                    const responseData = await sendRequest(
                        process.env.REACT_APP_RECOVERY_REQUEST + requestId
                    )
                    setHint(responseData.request)
                } catch (err) {

                }
            })()
        }

    }, [hint])

    const errorHandler = () => {
        clearError()
    }
    const onClearHandler = () => {
        setShow(false)
        history.push('/')
    }

    const onSubmitHandler = async e => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_UPDATE_PASSWORD + requestId,
                'PATCH',
                JSON.stringify({
                    password: encrypt(inputState.inputs.password.value),
                    answer: inputState.inputs.answer.value
                }),
                { 'Content-Type': 'application/json' })
            setShow(true)

        } catch (err) {

        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            {isLoading && <LoadingSpinner asOverlay />}
            <PasswordResetModal onClear={onClearHandler} show={show} />
            <form onSubmit={onSubmitHandler}>

                <div className='password-recovery__outer-cont' >

                    <div className='password-recovery__container' >
                        <h1>Password recovery</h1>
                        <p>{hint}</p>
                        <Input
                            id='answer'
                            label='Answer'
                            value={inputState.inputs.answer.value}
                            errorText='Please enter your answer'
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                            onInput={handler} />
                        <Input
                            id='password'
                            label='New password'
                            value={inputState.inputs.password.value}
                            errorText='Your password must be at least 6 character long'
                            validators={[VALIDATOR_MINLENGTH(6)]}
                            type='password'
                            onInput={handler}
                        />
                        <Input
                            id='passwordAgain'
                            label='Password again'
                            onInput={handler}
                            value={inputState.inputs.passwordAgain.value}
                            errorText='Passwords do not match!'
                            type='password'
                            validators={[]}
                            password={inputState.inputs.password.value}
                        />
                        <Button
                            disabled={isFormValid}
                            type='submit'
                        >Submit</Button>


                    </div>
                </div>
            </form>
        </React.Fragment>
    )

}


export default PassRecovery;