import React, { useEffect, useState } from 'react';

import Modal from '../../shared/UIElements/Modal';
import Button from '../../shared/UIElements/Button';
import Input from '../../shared/form-elements/Input';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_REQUIRE
} from '../../shared/utility/validators';

import './user.css'

const Signin = props => {

    const [disabled, setDisabled] = useState(true);
    const { email, password } = props.value;
    useEffect(() => {
        if (email.valid && password.valid) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [email, password])

    return (
        <Modal
            className='signin'
            onCancel={props.onClear}
            header={props.header}
            show={!!props.show}
            onSubmit={props.onSubmit}
            footer={<Button
                className='register-button'
                type='button'
                onClick={props.register}>
                REGISTER
             </Button>}
        >
            {props.isLoading && <LoadingSpinner asOverlay />}
            <Input
                id='email'
                label='Email'
                value={props.value.email.value}
                errorText='Please enter a valid email address'
                validators={[VALIDATOR_EMAIL()]}
                type='text'
                onInput={props.onInput}
            />
            <Input
                id='password'
                label='Password'
                value={props.value.password.value}
                validators={[VALIDATOR_REQUIRE()]}
                errorText='Please enter your password'
                type='password'
                onInput={props.onInput}
            />
            {props.children}
            <Button
                disabled={disabled}
                className='signin-button'
                onSubmit={props.signin}>
                SIGN IN
             </Button>
            <h4>New customer?</h4>
            <p>Registering is quick and easy</p>
        </Modal>
    )
}

export default Signin;

