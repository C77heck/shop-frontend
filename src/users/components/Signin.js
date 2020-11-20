import React, { useState } from 'react';

import Modal from '../../shared/UIElements/Modal';
import Button from '../../shared/UIElements/Button';
import Input from '../../shared/form-elements/Input';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL
} from '../../shared/utility/validators';

import './user.css'

const Signin = props => {

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
            <Input
                id='email'
                value={props.value.email.value}
                errorText='Please enter a valid email address'
                validators={[VALIDATOR_EMAIL()]}
                type='text'
                onInput={props.onInput}
            />
            <Input
                id='password'
                value={props.value.password.value}
                validators={[]}
                type='password'
                onInput={props.onInput}
            />            <Button
                className='signin-button'
                onClick={props.signin}>
                SIGN IN
             </Button>
            <h4>New customer?</h4>
            <p>Registering is quick and easy</p>
        </Modal>
    )
}

export default Signin;

