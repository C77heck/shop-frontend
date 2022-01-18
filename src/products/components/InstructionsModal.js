import React, { useState, useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import Modal from '../../shared/UIElements/Modal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useForm } from '../../shared/hooks/form-hook';
import Button from '../../shared/UIElements/Button';
import Input from '../../shared/form-elements/Input';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';



const trimString = (string) => {
    if (string === '') {
        return '';
    }
    return string.slice(0, 15) + '...'
}


const InstructionsModal = () => {

    const auth = useContext(AuthContext)
    const { sendRequest, isLoading } = useHttpClient();
    const [show, setShow] = useState(false)
    const [inputState, inputHandler, isFormValid, setFormData] = useForm({
        instructions: {
            value: '',
            valid: true
        }
    })
    const instructionsHandler = () => {
        setShow(true)
    }
    const cancelHandler = () => {
        setShow(false)

    }
    const formHandler = async e => {
        e.preventDefault();
        try {
            setShow(false)

            const responseData = await sendRequest(
                process.env.REACT_APP_INSTRUCTIONS,
                'PATCH',
                JSON.stringify({
                    instructions: inputState.inputs.instructions.value,
                    userId: auth.userId
                }),
                {
                    Authorization: 'Bearer ' + auth.token,
                    'Content-Type': 'application/json'
                }
            )
            setFormData({
                value: responseData.instructions,
                valid: true
            })


        } catch (err) {
            console.log(err)

        }

    }




    return (
        <React.Fragment>
            <Modal
                className='instructions-modal'
                onCancel={cancelHandler}
                show={show}
                onSubmit={formHandler}
                footer={<Button>Done</Button>}
            >
                {isLoading && <LoadingSpinner asOverlay />}

                <Input
                    element='textarea-nope'
                    id='instructions'
                    label='delivery instructions'
                    labelStyle={{ fontSize: "1.2rem", letterSpacing: "1.5px" }}
                    style={{ resize: "none" }}
                    onInput={inputHandler}
                    value={inputState?.inputs?.instructions?.value || ''}
                    validators={[]}
                />
            </Modal>
            <button
                className='book-delivery_buttons'
                onClick={instructionsHandler}
            ><span>{trimString(inputState?.inputs?.instructions?.value || '')}</span>
                <span className='book-delivery__span'>
                    {inputState.inputs.instructions.value === '' ?
                        ' Add delivery instructions' : ' Edit delivery instructions'}
                </span>
            </button>
        </React.Fragment>
    )
}

export default InstructionsModal;