import React, { useContext, useState } from 'react';

import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/utility/validators';

import { AuthContext } from '../../shared/context/auth-context';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';

import Button from '../../shared/UIElements/Button';
import Input from '../../shared/form-elements/Input';
import Modal from '../../shared/UIElements/Modal';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import { encrypt } from '../../shared/utility/encrypt';

import './UserPasswordReset.css';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';

const UserPasswordReset = props => {


    const { userId } = useContext(AuthContext)

    const { sendRequest, clearError, error, isLoading } = useHttpClient();
    const [message, setMessage] = useState()

    const [inputState, inputHandler, isFormValid] = useForm({
        oldPassword: {
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
        answer: {
            value: '',
            valid: false
        }
    })



    const submitHandler = async e => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_USER_RESET_PASSWORD,
                'POST',
                JSON.stringify({
                    userId: userId,
                    answer: inputState.inputs.answer.value,
                    oldPassword: encrypt(inputState.inputs.oldPassword.value),
                    newPassword: encrypt(inputState.inputs.password.value)
                }),
                { 'Content-Type': 'application/json' }
            )
            setMessage(responseData.message)
        } catch (err) {
            console.log(err)

        }
    }


    return (<React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <Modal
            className='password-change__modal'
            onCancel={props.onClear}
            header={props.header}
            show={props.show}
            onSubmit={submitHandler}

        >
            {isLoading && <LoadingSpinner asOverlay />}
            <div className='password-change__container' >
                {!message ? <React.Fragment><h2>{props.hint}</h2>
                    <Input
                        id='answer'
                        label='Your answer'
                        onInput={inputHandler}
                        value={inputState.inputs.answer.value}
                        validators={[VALIDATOR_MINLENGTH(4)]}
                        type='text'
                        className='answer__input'
                        contClass='answer__div'
                        errorText='Please enter your answer'
                    />
                    <Input
                        id='oldPassword'
                        label='Old password'
                        onInput={inputHandler}
                        value={inputState.inputs.oldPassword.value}
                        errorText='Please enter your old password.'
                        validators={[VALIDATOR_REQUIRE()]}
                        type='password'
                    />
                    <Input
                        id='password'
                        label='New password'
                        onInput={inputHandler}
                        value={inputState.inputs.password.value}
                        errorText='Your password must be at least 6 character long'
                        type='password'
                        validators={[VALIDATOR_MINLENGTH(6)]}
                    />
                    <Input
                        id='passwordAgain'
                        label='New password again'
                        onInput={inputHandler}
                        value={inputState.inputs.passwordAgain.value}
                        errorText='Passwords do not match!'
                        type='password'
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        password={inputState.inputs.password.value}
                    />
                    <Button
                        disabled={isFormValid}
                    >Submit</Button>
                </React.Fragment> : <h2>{message}</h2>}

            </div>
        </Modal>
    </React.Fragment>
    )
}




export default UserPasswordReset;