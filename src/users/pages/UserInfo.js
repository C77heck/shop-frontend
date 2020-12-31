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

    const auth = useContext(AuthContext)

    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    const [inputState, handler, setFormData] = useInput({
        firstName: {
            value: '',
            valid: true
        },
        lastName: {
            value: '',
            valid: true
        },
        email: {
            value: '',
            valid: true
        },
        phone: {
            value: '',
            valid: true
        },
        city: {
            value: '',
            valid: true
        },
        street: {
            value: '',
            valid: true
        },
        postCode: {
            value: '',
            valid: true
        },
        houseNumber: {
            value: '',
            valid: true
        },
        hint: {
            value: '',
            valid: true
        },
        answer: {
            value: '',
            valid: true
        },
        instructions: {
            value: '',
            valid: true
        }
    })

    const [show, setShow] = useState(false)
    const [question, setQuestion] = useState()

    const onChangeHandler = e => {
        setQuestion(e.target.value)
    }

    const onClearHandler = () => {
        setShow(false)
    }

    useEffect(() => {
        (async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_USERS + auth.userId
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
                    hint: {
                        value: responseData.userData.hint,
                        valid: true
                    },
                    answer: {
                        value: responseData.userData.answer,
                        valid: true
                    }
                })
            } catch (err) {

            }
        })()
    }, [])
    const submitHandler = async e => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_UPDATE + auth.userId,
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
                    instructions: inputState.inputs.instructions.value,
                    question: inputState.inputs.question.value,
                    answer: inputState.inputs.answer.value
                }),
                {
                    Authorization: 'Bearer ' + auth.token,
                    'Content-Type': 'application/json'
                }
            )
            setShow(true)
        } catch (err) {

        }

    }

    return (
        <div className='my__account-container'>
            <ErrorModal asOverlay error={error} onClear={clearError} />
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
                onClick={submitHandler}
                onChange={onChangeHandler}
            />
        </div>


    )


}


export default UserInfo;
