import React, { useState } from 'react';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL,
    VALIDATOR_PHONE
} from '../../shared/utility/validators';

import { useInput } from '../../shared/hooks/form-hook';

import Button from '../../shared/UIElements/Button';
import Input from '../../shared/form-elements/Input';
import PasswordResetter from './PasswordResetter';
import { useHttpClient } from '../../shared/hooks/http-hook';
import SecQuestions from './SecQuestions';


const UserForms = props => {

    const { sendRequest } = useHttpClient();
    const [inputState, handler] = useInput({
        email: {
            value: '',
            valid: true
        }
    })

    const [show, setShow] = useState(false)
    const [message, setMessage] = useState(true)


    const onClickHandler = () => {
        setShow(true)
    }

    const onClearHandler = () => {
        setShow(false)
        setMessage(true)
    }

    const submitHandler = async e => {
        e.preventDefault();
        try {
            await sendRequest(
                process.env.REACT_APP_RECOVERY,
                'POST',
                JSON.stringify({
                    email: inputState.inputs.email.value
                }),
                { 'Content-Type': 'application/json' }
            )
            setMessage(false)

        } catch (err) {

        }
    }

    return (
        <React.Fragment>
            <PasswordResetter
                onClear={onClearHandler}
                show={show}
                onSubmit={submitHandler}
                message={message}
                onInput={handler}
                value={inputState.inputs.email.value}
            />
            <div
                className='my__account_flex'
            >
                <div className='my__account_left'>
                    <Input
                        id='firstName'
                        label='First Name'
                        onInput={props.onInput}
                        value={props.value.firstName.value}
                        errorText='Please enter your first name'
                        validators={[VALIDATOR_REQUIRE()]}
                        type='text'
                    />
                    <Input
                        id='lastName'
                        label='Last Name'
                        onInput={props.onInput}
                        value={props.value.lastName.value}
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
                        id='phone'
                        label='Phone number'
                        onInput={props.onInput}
                        value={props.value.phone.value}
                        validators={[VALIDATOR_PHONE()]}
                        placeholder='(e.g. 020 5555 555)'
                        errorText='Please enter a valid phone number'
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
                </div>
                <div className='my__account_right'>

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
                    <SecQuestions
                        onChange={props.onChange}
                        value={props.value.hint.value}
                    />
                    <Input
                        id='answer'
                        label='Your answer'
                        onInput={props.onInput}
                        value={props.value.answer.value}
                        validators={[VALIDATOR_REQUIRE()]}
                        type='text'
                    />
                    <Input
                        element='textarea'
                        id='instructions'
                        label='instructions'
                        onInput={props.onInput}
                        value={props.value.instructions.value}
                        errorText='Please enter your first name'
                        validators={[VALIDATOR_REQUIRE()]}
                        type='text'
                    />

                </div>

            </div>
            <div className='my__account-buttons'>
                <Button
                    type='button'
                    onClick={onClickHandler}
                    disabled={props.disabled}
                    className=''
                >Change password</Button>
                <Button
                    onClick={props.onClick}
                    disabled={props.disabled}
                    className='register-button'
                >Submit changes</Button>

            </div>
        </React.Fragment>
    )
}


export default UserForms;

