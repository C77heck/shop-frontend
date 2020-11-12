import React from 'react';

import Modal from '../../shared/UIElements/Modal';
import Button from '../../shared/UIElements/Button';
import InputComponent from '../../shared/UIElements/InputComponent';

import './Signin.css'

const Signin = props => {





    return (
        <Modal
            className='signin'
            onCancel={props.onClear}
            header={props.header}
            show={!!props.show}
            onSubmit={props.onSubmit}
            footer={<Button className='register-button' onClick={props.register}>REGISTER</Button>}
        >
            <InputComponent
                onChange={props.onChange}
                value={props.value.email}
                property='email'
                type='email'
            />
            <InputComponent
                onChange={props.onChange}
                value={props.value.password}
                property='password'
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

