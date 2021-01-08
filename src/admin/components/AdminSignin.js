import React, { useState } from 'react';

import { useInput } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/UIElements/Button';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import Modal from '../../shared/UIElements/Modal';
import Input from '../../shared/form-elements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/utility/validators';
import AdminIcon from './AdminIcon';


const AdminModal = props => {
    return (
        <Modal
            className={props.className}
            show={props.show}
            onCancel={props.onClear}
            onSubmit={props.onSubmit}
        >
            {props.children}
        </Modal>
    )
}

const AdminSignin = props => {


    const { sendRequest, isLoading, error, clearError } = useHttpClient()

    const [show, setShow] = useState(false)

    const [inputState, handler, isFormValid] = useInput({
        id: {
            value: '',
            valid: false
        },
        password: {
            value: '',
            valid: ''
        }
    })

    const onSubmitHandler = e => {
        e.preventDefault();
        console.log('it works')
    }
    const onClearHandler = () => {
        setShow(false)
    }


    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            <ErrorModal error={error} onClear={clearError} />
            <AdminModal
                className='admin-modal'
                show={show}
                onClear={onClearHandler}
            >
                <Input
                    id='id'
                    label='Account ID'
                    onInput={handler}
                    value={inputState.inputs.id.value}
                    errorText='Please enter your account ID.'
                    validators={[VALIDATOR_REQUIRE()]}
                    type='text'
                />
                <Input
                    id='password'
                    label='Password'
                    onInput={handler}
                    value={inputState.inputs.password.value}
                    errorText='Please enter your password'
                    validators={[VALIDATOR_REQUIRE()]}
                    type='password'
                />
                <Button
                    disabled={isFormValid}
                >
                    Signin
                </Button>
            </AdminModal>
            <Button
                className={props.className}
                onClick={() => setShow(true)}
            ><AdminIcon /><span> Signin</span>
            </Button>
        </React.Fragment>
    )
}

export default AdminSignin;