import React, { useState } from 'react';

import Modal from '../../shared/UIElements/Modal';
import Button from '../../shared/UIElements/Button';
import InputComponent from '../../shared/UIElements/InputComponent';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../../shared/utility/validators';
import Input from '../../shared/form-elements/Input';
import { useForm } from '../../shared/hooks/form--hook';

import './user.css'

const Signin = props => {





    /*     const test = () => {
            ((value) => {
                console.log(formState)
            })()
        }
     */
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
            {props.children}
            <InputComponent
                onChange={props.onChange}
                value={props.value.email}
                property='email'
                name='email'
                type='email'
            />
            <InputComponent
                onChange={props.onChange}
                value={props.value.password}
                property='password'
                name='password'
                type='password'
            />
            <Button
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

