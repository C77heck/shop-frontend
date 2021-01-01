import React, { useEffect, useState } from 'react';

import Modal from '../../shared/UIElements/Modal';
import Button from '../../shared/UIElements/Button';
import Input from '../../shared/form-elements/Input';

import {
    VALIDATOR_EMAIL
} from '../../shared/utility/validators';

const baseMessage = 'Please provide your email address and we'
    +
    ' will send you a password recovery link';
const sentMessage = 'Your password recovery link has been sent!';

const PasswordModal = props => {
    const [display, setDisplay] = useState('unset')

    useEffect(() => {
        if (props.message) {
            setDisplay('unset')
        } else {
            setDisplay('none')
        }
    }, [props.message])

    const style = {
        display: display
    }

    return (
        <Modal
            className=''
            header='Password assistance'
            onCancel={props.onClear}
            show={props.show}
            onSubmit={props.onSubmit}
            footer={props.message ? <Button>
                Send link
             </Button> : null}
        >
            <p>{props.message ? baseMessage : sentMessage}</p>
            <Input
                id='email'
                label='Your Email'
                errorText='Please enter a valid email address'
                value={props.value}
                validators={[VALIDATOR_EMAIL()]}
                type='text'
                onInput={props.onInput}
                containerStyle={style}
            />
        </Modal>
    )
}

const PasswordResetter = props => {

    return (
        <PasswordModal
            onClear={props.onClear}
            show={props.show}
            onSubmit={props.onSubmit}
            onInput={props.onInput}
            value={props.value}
            message={props.message}
        />
    )

}


export default PasswordResetter;