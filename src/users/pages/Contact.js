import React, { useState } from 'react';

import Input from '../../shared/form-elements/Input';
import { useInput } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/UIElements/Button';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_EMAIL
} from '../../shared/utility/validators';
import {
    Facebook,
    Linkedin,
    Twitter,
    Instagram
} from '../../shared/footer/SocialMedia';


import './Contact.css';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import Modal from '../../shared/UIElements/Modal';

const Contact = () => {

    const { sendRequest, error, clearError, isLoading } = useHttpClient();

    const [inputState, handler, isFormValid, setFormData] = useInput({
        name: {
            value: '',
            valid: false
        },
        email: {
            value: '',
            valid: false
        },
        message: {
            value: '',
            valid: false
        }
    })

    const onSubmitHandler = async e => {
        e.preventDefault();

        try {
            const responseData = await sendRequest(process.env.REACT_APP_CONTACT_US,
                'POST',
                JSON.stringify({
                    name: inputState.inputs.name.value,
                    email: inputState.inputs.email.value,
                    message: inputState.inputs.message.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            )
            setMessage(responseData.message)
        } catch (err) {
            console.log(err)
        }

    }
    const [message, setMessage] = useState('')
    const onClearHandler = () => {
        setMessage('')
        setFormData({
            name: {
                value: '',
                valid: false
            },
            email: {
                value: '',
                valid: false
            },
            message: {
                value: '',
                valid: false
            }
        })
    }

    return (<div>
        <Modal
            show={!!message}
            onCancel={onClearHandler}
        >
            <h2>{message}</h2>
        </Modal>
        <ErrorModal error={error} onClear={clearError} />
        <form className='contact-us__form' onSubmit={onSubmitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <h1>How Can We Help?</h1>

            <Input
                id='name'
                label='Your name:'
                onInput={handler}
                value={inputState.inputs.name.value}
                errorText='Please enter your name.'
                validators={[VALIDATOR_REQUIRE()]}
                type='text'
            />
            <Input
                id='email'
                label='Your email:'
                onInput={handler}
                value={inputState.inputs.email.value}
                errorText='Please enter a valid email address.'
                validators={[VALIDATOR_EMAIL()]}
                type='text'
            />

            <Input
                element='textarea'
                id='message'
                label='Your message:'
                onInput={handler}
                value={inputState.inputs.message.value}
                validators={[]}
                type='text'
                rows={8}
            />
            <Button
                disabled={isFormValid}
            >SEND</Button>
        </form>
        <div className='contact-us__horizontal-line' />
        <div className='contact-us__info'>
            <div>
                <h2>CALL</h2>
                <p>+44(0)2012345678</p>
            </div>
            <div>
                <h2>EMAIL</h2>
                <p>EMAIL@EMAIL.COM</p>
            </div>
            <div>
                <h2>ADDRESS</h2>
                <p>13 SWALLOW STREET, W12 4DG</p>
            </div>
        </div>
        <div className='contact-us__horizontal-line' />
        <div>
            <h2 className='contact-us__social-title'>Other Ways To Contact Us</h2>
            <div className='contact-us__social-media__wrapper'>
                <Facebook link='' className='contact-us__social-media' />
                <Linkedin link='' className='contact-us__social-media' />
                <Twitter link='' className='contact-us__social-media' />
                <Instagram link='' className='contact-us__social-media' />
            </div>
        </div>

    </div>
    )
}



export default Contact;