import React, { useState, useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import Modal from '../../shared/UIElements/Modal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useInput } from '../../shared/hooks/form-hook';
import Button from '../../shared/UIElements/Button';
import Input from '../../shared/form-elements/Input';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';


const InstructionsModal = () => {

    const auth = useContext(AuthContext)
    const { sendRequest, isLoading } = useHttpClient();
    const [show, setShow] = useState(false)
    const [inputState, handler] = useInput({
        instructions: {
            value: '',
            valid: true
        }
    })
    const [display, setDisplay] = useState();
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
            setDisplay(responseData.instructions)


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
                    element='textarea'
                    id='instructions'
                    label='delivery instructions'
                    labelStyle={{ fontSize: "1.2rem", letterSpacing: "1.5px" }}
                    style={{ resize: "none" }}
                    onInput={handler}
                    value={inputState.inputs.instructions.value}
                    validators={[]}
                />
            </Modal>
            <button
                className='book-delivery_buttons'
                onClick={instructionsHandler}
            >{display} Edit delivery instructions</button>
        </React.Fragment>
    )
}

export default InstructionsModal;