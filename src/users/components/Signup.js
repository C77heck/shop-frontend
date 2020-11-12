import React from 'react';
import { Link } from 'react-router-dom';

import Modal from '../../shared/UIElements/Modal';
import Button from '../../shared/UIElements/Button';
import InputComponent from '../../shared/UIElements/InputComponent';

import './Signin.css'

const Signup = props => {

    return (
        <Modal
            className='signin'
            onCancel={props.onClear}
            header={props.header}
            show={!!props.show}
            onSubmit={props.onSubmit}
            footer={<React.Fragment>
                <Button
                    className='register-button'
                    onClick={props.signup}>
                    SIGN UP
                </Button>
                <p>For further information on how we use your data please read our
                <Link to='/shopping'>privacy policy</Link>.
                By submitting this form you agree to the
                 <Link to='/shopping'>terms and conditions</Link>.</p>
            </React.Fragment>}
        >
            <InputComponent
                onChange={props.onChange}
                value={props.value.fName}
                property='fName'
                type='text'
            />
            <InputComponent
                onChange={props.onChange}
                value={props.value.lName}
                property='surname'
                type='text'

            />
            <InputComponent
                onChange={props.onChange}
                value={props.value.email}
                property='email'
                type='email'
            />
            <InputComponent
                placeholder='minimum of 6 characters'
                onChange={props.onChange}
                value={props.value.password}
                property='password'
                type='password'

            />

        </Modal>
    )
}

export default Signup;