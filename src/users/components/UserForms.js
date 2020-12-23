import React from 'react';

import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL,
    VALIDATOR_PHONE
} from '../../shared/utility/validators';

import Button from '../../shared/UIElements/Button';
import Input from '../../shared/form-elements/Input';


const UserForms = props => {

    return (
        <form onSubmit={props.onSubmit}>
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
            <Button
                disabled={props.disabled}
                className='register-button'
            >Submit changes</Button>
        </form>
    )
}


export default UserForms;