import React from 'react';

import Modal from '../../shared/UIElements/Modal';
import Button from '../../shared/UIElements/Button';
import Input from '../../shared/form-elements/Input';

import {
    VALIDATOR_EMAIL
} from '../../shared/utility/validators';

const PasswordModal = props => {

    return (
        <Modal
            className=''
            header='Password assistance'
            onCancel={props.onClear}
            show={!!props.show}
            onSubmit={props.onSubmit}
            footer={<Button
                onClick={props.sendRequest}>
                Send link
             </Button>}>
            {
                !props.message ?
                    <p>
                        Please provide your email address and we will
                        send you a password recovery link
                        </p>
                    :
                    <p>
                        Your password recovery link has been sent!
                        </p>
            }
            <Input
                id='email'
                label='Your Email'
                errorText='Please enter a valid email address'
                value={props.value}
                validators={[VALIDATOR_EMAIL()]}
                type='text'
                onInput={props.onInput}
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
        />
    )

}


export default PasswordResetter;