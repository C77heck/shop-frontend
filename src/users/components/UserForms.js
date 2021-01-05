import React, { useState } from 'react';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL,
    VALIDATOR_PHONE
} from '../../shared/utility/validators';

import Button from '../../shared/UIElements/Button';
import Input from '../../shared/form-elements/Input';
import UserPasswordReset from './UserPasswordReset';



const UserForms = props => {

    const [show, setShow] = useState(false);

    const onClickHandler = () => {
        setShow(true)
    }
    const onCancelHandler = () => {
        setShow(false)

    }



    return (
        <React.Fragment>
            <UserPasswordReset
                header={'Reset password'}
                show={show}
                onClear={onCancelHandler}
                hint={props.hint}
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
                        errorText='Please enter your city'
                        validators={[VALIDATOR_REQUIRE()]}
                        type='text'
                    />
                </div>
                <div className='my__account_right'>


                    <Input
                        id='street'
                        label='Street or Square'
                        onInput={props.onInput}
                        value={props.value.street.value}
                        errorText='Please enter your street'
                        validators={[VALIDATOR_REQUIRE()]}
                        type='text'
                    />
                    <Input
                        id='postCode'
                        label='Post code'
                        onInput={props.onInput}
                        value={props.value.postCode.value}
                        errorText='Please enter your post code'

                        validators={[VALIDATOR_REQUIRE()]}
                        type='text'
                    />
                    <Input
                        id='houseNumber'
                        label='House number'
                        onInput={props.onInput}
                        value={props.value.houseNumber.value}
                        errorText='Please enter your house number'
                        validators={[VALIDATOR_REQUIRE()]}
                        type='text'
                    />

                    <Input
                        element='textarea'
                        id='instructions'
                        label='Delivery instructions'
                        onInput={props.onInput}
                        value={props.value.instructions.value}
                        validators={[]}
                        type='text'
                    />

                </div>

            </div>
            <div className='my__account-buttons'>
                <Button
                    type='button'
                    onClick={onClickHandler}
                    className='change-password__button'
                >Change password</Button>
                <Button
                    onClick={props.onClick}
                    disabled={props.disabled}
                    className='submit-changes__button'
                >Submit changes</Button>
            </div>
        </React.Fragment>
    )
}


export default UserForms;

