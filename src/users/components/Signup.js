import React from 'react';
import { Link } from 'react-router-dom';

import Modal from '../../shared/UIElements/Modal';
import Button from '../../shared/UIElements/Button';

import Input from '../../shared/form-elements/Input';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL,

} from '../../shared/utility/validators';

import './user.css'

const Signup = props => {


    return (
        <Modal
            className='signup'
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
            </React.Fragment>}>
            <div className='signup_form-container' >
                <div className='signup_form-left'>
                    <Input
                        id='fName'
                        label='First name'
                        onInput={props.onInput}
                        value={props.value.fName.value}
                        errorText='Please enter your first name'
                        validators={[VALIDATOR_REQUIRE()]}
                        type='text'
                    />
                    <Input
                        id='surname'
                        label='Surname'
                        onInput={props.onInput}
                        value={props.value.surname.value}
                        errorText='Please enter your surname'
                        validators={[VALIDATOR_REQUIRE()]}
                        type='text'
                    />
                    <Input
                        id='email'
                        label='Email'
                        onInput={props.onInput}
                        value={props.value.email.value}
                        errorText='Please enter a valid email address'
                        validators={[VALIDATOR_EMAIL()]}
                        type='text'
                    />
                    <Input
                        id='password'
                        label='Password'
                        onInput={props.onInput}
                        value={props.value.password.value}
                        errorText='Your password must be at least 6 character long'
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        type='password'
                    />
                    <Input
                        id='passwordAgain'
                        label='Password again'
                        onInput={props.onInput}
                        value={props.value.passwordAgain.value}
                        errorText='Passwords do not match!'
                        type='password'
                        validators={[]}

                    />

                </div>
                <div className='signup_form-right'>
                    <Input
                        id='phone'
                        label='Phone number'
                        onInput={props.onInput}
                        value={props.value.phone.value}
                        validators={[VALIDATOR_REQUIRE()]}
                        type='text'
                    />
                    <Input
                        id='city'
                        label='City'
                        onInput={props.onInput}
                        value={props.value.city.value}
                        validators={[VALIDATOR_REQUIRE()]}
                        type='text'
                    />
                    <Input
                        id='street'
                        label='Street or Square'
                        onInput={props.onInput}
                        value={props.value.street.value}
                        validators={[VALIDATOR_REQUIRE()]}
                        type='text'
                    />
                    <div className='smaller-inputs' >
                        <Input
                            id='postCode'
                            label='Post code'
                            onInput={props.onInput}
                            value={props.value.postCode.value}
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                        />
                        <Input
                            id='houseNumber'
                            label='House number'
                            onInput={props.onInput}
                            value={props.value.houseNumber.value}
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default Signup;