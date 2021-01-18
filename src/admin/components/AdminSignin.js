import React, { useContext, useState } from 'react';

import { useInput } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/UIElements/Button';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import Modal from '../../shared/UIElements/Modal';
import Input from '../../shared/form-elements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/utility/validators';
import AdminIcon from './AdminIcon';
import { AdminContext } from '../../shared/context/admin-context';


const AdminModal = props => {
    return (
        <Modal
            header={props.header}
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

    const { isAdminLoggedIn, adminSignin, adminSignout } = useContext(AdminContext)
    const { sendRequest, isLoading, error, clearError } = useHttpClient()

    const [show, setShow] = useState(false)

    const [inputState, handler, isFormValid] = useInput({
        accountID: {
            value: '',
            valid: false
        },
        password: {
            value: '',
            valid: false
        }
    })

    const onSubmitHandler = async e => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_ADMIN_SIGNIN,
                'POST',
                JSON.stringify({
                    accountID: inputState.inputs.accountID.value,
                    password: inputState.inputs.password.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            )
            adminSignin(responseData.userId, true)
            setShow(false)
        } catch (err) {
            console.log(err)

        }
    }
    const onClearHandler = () => {
        setShow(false)
    }


    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            <ErrorModal error={error} onClear={clearError} />
            <AdminModal
                header='Admin signin'
                className='admin-modal'
                show={show}
                onClear={onClearHandler}
                onSubmit={onSubmitHandler}
            >
                <Input
                    id='accountID'
                    label='Account ID'
                    onInput={handler}
                    value={inputState.inputs.accountID.value}
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
            {!isAdminLoggedIn ? <Button
                className={props.className}
                onClick={() => setShow(true)}
            ><AdminIcon /><span>Signin</span>
            </Button>
                :
                <Button
                    className={props.className}
                    onClick={() => adminSignout()}
                ><AdminIcon /><span>Signout</span>
                </Button>
            }
        </React.Fragment>
    )
}

export default AdminSignin;