import React from 'react';
import { Link } from 'react-router-dom';

import Modal from '../../shared/UIElements/Modal';
import Button from '../../shared/UIElements/Button';
import InputComponent from '../../shared/UIElements/InputComponent';

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
            </React.Fragment>}
        >
            <div className='signup_form-container' >
                <div className='signup_form-left'>            <InputComponent
                    onChange={props.onChange}
                    value={props.value.fName.value}
                    property='first name'
                    name='fName'
                    type='text'
                />
                    <InputComponent
                        onChange={props.onChange}
                        value={props.value.lName}
                        property='surname'
                        name='lName'
                        type='text'

                    />
                    <InputComponent
                        onChange={props.onChange}
                        value={props.value.email}
                        property='email'
                        name='email'
                        type='email'
                    />
                    <InputComponent
                        placeholder='minimum of 6 characters'
                        onChange={props.onChange}
                        value={props.value.password}
                        property='password'
                        name='password'
                        type='password'

                    />
                    <InputComponent
                        placeholder='minimum of 6 characters'
                        onChange={props.onChange}
                        value={props.value.password2}
                        property='password again'
                        name='password2'
                        type='password'

                    /></div>
                <div className='signup_form-right'>
                    <InputComponent
                        onChange={props.onChange}
                        value={props.value.phone}
                        property='phone number'
                        name='phone'
                        type='number'
                    />

                    <InputComponent
                        onChange={props.onChange}
                        value={props.value.city}
                        property='city'
                        name='city'
                        type='text'
                    />
                    <InputComponent
                        onChange={props.onChange}
                        value={props.value.street}
                        property='street or square'
                        name='street'
                        type='text'

                    />
                    <div className='smaller-inputs' >
                        <InputComponent
                            className='post-code'
                            onChange={props.onChange}
                            value={props.value.postCode}
                            property='post code'
                            name='postCode'
                            type='text'
                        />
                        <InputComponent
                            className='house-number'
                            onChange={props.onChange}
                            value={props.value.houseNumber}
                            property='house number'
                            name='houseNumber'
                            type='text'
                        />
                    </div>


                </div>
            </div>

        </Modal>
    )
}

export default Signup;