import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom'

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH
} from '../../shared/utility/validators';

import Input from '../../shared/form-elements/Input';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useInput } from '../../shared/hooks/form-hook';
import Button from '../../shared/UIElements/Button';
import Modal from '../../shared/UIElements/Modal';
import { useParams } from 'react-router-dom';
import { encrypt } from '../../shared/utility/encrypt';

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

    const { userId } = useParams()
    const { sendRequest } = useHttpClient()
    const [inputState, handler] = useInput({
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
    const [disabled, setDisabled] = useState(true)
    const [hint, setHint] = useState('')

    useEffect(() => {
        for (let i in inputState.inputs) {
            if (inputState.inputs[i].valid === false) {
                setDisabled(true)
            } else {
                setDisabled(false)
            }
        }
    }, [inputState])

    useEffect(() => {
        if (hint === '') {
            (async () => {
                try {
                    const responseData = await sendRequest(
                        process.env.REACT_APP_USERS + userId
                    )
                    setHint(responseData.userData.hint)
                } catch (err) {

                }
            })()
        }

    }, [hint])

    const onClearHandler = () => {
        setShow(false)
        history.push('/')
    }
    const onClickHandler = async () => {
        try {
            setShow(true)
            await sendRequest(
                process.env.REACT_APP_UPDATE_PASSWORD + userId,
                'PATCH',
                JSON.stringify({
                    password: encrypt(inputState.inputs.password.value),
                    answer: inputState.inputs.answer.value
                }),
                { 'Content-Type': 'application/json' })
        } catch (err) {

        }
    }

    return (
        <React.Fragment>
            <PasswordResetModal onClear={onClearHandler} show={show} />
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
                        label='Password'
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
                        disabled={disabled}
                        onClick={onClickHandler}
                    >Submit</Button>
                </div>
            </div>
        </React.Fragment>
    )

}


export default PassRecovery;