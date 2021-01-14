import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from '../../shared/UIElements/Modal';
import Button from '../../shared/UIElements/Button';
import Input from '../../shared/form-elements/Input';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import SecQuestions from './SecQuestions';
import BackIcon from './BackIcon';
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL,
    VALIDATOR_PHONE
} from '../../shared/utility/validators';

import './user.css'


const FirstPage = props => {
    return (
        <React.Fragment>
            <div className='signup_form-container' >
                <div className='signup-page__right'>
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
                </div>
                <div className='signup-page__left'>
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
                        password={props.password}
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
                </div>
            </div>

        </React.Fragment>
    )
}
const SecondPage = props => {
    return (
        <React.Fragment>
            <div className='signup_form-container' >

                <div className='signup-page__right'>
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

                <div className='signup-page__left'>
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
            <div className='security-question'>
                <SecQuestions
                    onChange={props.onChange}
                />
                <Input
                    id='answer'
                    label='Your answer'
                    onInput={props.onInput}
                    value={props.value.answer.value}
                    validators={[VALIDATOR_MINLENGTH(4)]}
                    type='text'
                    className='answer__input'
                    contClass='answer__div'
                    errorText='Your answer must be at least 4 character'
                />
            </div>
        </React.Fragment>
    )
}


const Signup = props => {
    const [isFirstPage, setIsFirstPage] = useState(true)


    const onClickHandler = e => {
        e.preventDefault();

        setIsFirstPage(prev => !prev);

    }

    return (
        <Modal
            className='signup'
            onCancel={props.onClear}
            header={props.header}
            show={!!props.show}
            onSubmit={props.onSubmit}
            footer={<React.Fragment>
                {isFirstPage ?
                    <Button
                        className='register-button'
                        onClick={onClickHandler}
                    >
                        NEXT
                </Button>
                    :
                    <React.Fragment>
                        <Button
                            className='back-btn'
                            onClick={onClickHandler}
                        ><BackIcon /></Button>
                        <Button
                            disabled={props.disabled}
                            className='register-button'
                            onSubmit={props.onSubmit}
                        >
                            SIGN UP
                </Button>
                    </React.Fragment>
                }
                <p>Already have an account? <span className='signin-here' onClick={props.cancelSignup}>sign in here</span></p>
                <p>For further information on how we use your data please read our
                <Link to='/shopping'>privacy policy</Link>.
                By submitting this form you agree to the
                 <Link to='/shopping'>terms and conditions</Link>.</p>
            </React.Fragment>}>
            {props.isLoading && <LoadingSpinner asOverlay />}
            {isFirstPage ? <FirstPage
                onInput={props.onInput}
                value={props.value}
                onChange={props.onChange}
                password={props.password}
            />
                :
                <SecondPage
                    onInput={props.onInput}
                    value={props.value}
                    onChange={props.onChange}
                />}


        </Modal>
    )
}

export default Signup;