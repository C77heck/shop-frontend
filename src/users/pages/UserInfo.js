import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../shared/context/auth-context';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { useInput } from '../../shared/hooks/form-hook';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import Modal from '../../shared/UIElements/Modal';

import UserForms from '../components/UserForms';

import './UserInfo.css'


const UserInfo = () => {

    const { userId, token } = useContext(AuthContext)

    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    const [inputState, handler, isFormValid, setFormData] = useInput({
        firstName: {
            value: '',
            valid: false
        },
        lastName: {
            value: '',
            valid: false
        },
        email: {
            value: '',
            valid: false

        },
        phone: {
            value: '',
            valid: false

        },
        city: {
            value: '',
            valid: false

        },
        street: {
            value: '',
            valid: false

        },
        postCode: {
            value: '',
            valid: false

        },
        houseNumber: {
            value: '',
            valid: false

        },
        instructions: {
            value: '',
            valid: true

        }
    })
    const [email, setEmail] = useState() // email for the password recovery request
    const [show, setShow] = useState(false)
    const [hint, setHint] = useState('')





    const onClearHandler = () => {
        setShow(false)
    }

    useEffect(() => {
        (async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_USERS + userId
                )
                setFormData({
                    firstName: {
                        value: responseData.userData.fullName.firstName,
                        valid: true
                    },
                    lastName: {
                        value: responseData.userData.fullName.lastName,
                        valid: true
                    },
                    email: {
                        value: responseData.userData.email,
                        valid: true
                    },
                    phone: {
                        value: responseData.userData.phone,
                        valid: true
                    },
                    city: {
                        value: responseData.userData.address.city,
                        valid: true
                    },
                    street: {
                        value: responseData.userData.address.street,
                        valid: true
                    },
                    postCode: {
                        value: responseData.userData.address.postCode,
                        valid: true
                    },
                    houseNumber: {
                        value: responseData.userData.address.houseNumber,
                        valid: true
                    },
                    instructions: {
                        value: responseData.userData.instructions,
                        valid: true
                    },

                })
                setEmail(responseData.userData.email)
            } catch (err) {

            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {

                const responseData = await sendRequest(
                    process.env.REACT_APP_USER_HINT + userId
                )
                setHint(responseData.hint)
            } catch (err) {
            }
        })()
    }, [])

    const submitHandler = async e => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_UPDATE + userId,
                'PATCH',
                JSON.stringify({
                    fullName: {
                        firstName: inputState.inputs.firstName.value,
                        lastName: inputState.inputs.lastName.value
                    },
                    email: inputState.inputs.email.value,
                    phone: inputState.inputs.phone.value,
                    address: {
                        city: inputState.inputs.city.value,
                        street: inputState.inputs.street.value,
                        postCode: inputState.inputs.postCode.value,
                        houseNumber: inputState.inputs.houseNumber.value
                    },
                    instructions: inputState.inputs.instructions.value
                }),
                {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            )
            setShow(true)
        } catch (err) {

        }

    }

    return (
        <React.Fragment>
            <div className='my__account-container'>
                <ErrorModal error={error} onClear={clearError} />
                <Modal
                    className=''
                    onCancel={onClearHandler}
                    show={show}
                >
                    <h2>User info has been updated!</h2>
                </Modal>
                <UserForms
                    onInput={handler}
                    value={inputState.inputs}
                    email={email}
                    onClick={submitHandler}
                    disabled={isFormValid}
                    hint={hint}
                />
            </div>

        </React.Fragment>

    )


}


export default UserInfo;
