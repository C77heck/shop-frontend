import React, { useState, useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import Modal from '../../shared/UIElements/Modal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useInput } from '../../shared/hooks/form-hook';
import Button from '../../shared/UIElements/Button';
import Input from '../../shared/form-elements/Input';


const InstructionsModal = () => {

    const auth = useContext(AuthContext)
    const { sendRequest } = useHttpClient();
    const [show, setShow] = useState(false)
    const [inputState, handler] = useInput({
        instructions: {
            value: '',
            valid: true
        }
    })
    const [display, setDisplay] = useState();
    const instructionsHandler = () => {
        setShow(prev => !prev)
    }
    const formHandler = async e => {
        e.preventDefault();
        console.log(inputState.inputs.instructions.value)
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_UPDATE,
                'PATCH',
                JSON.stringify({
                    instructions: inputState.inputs.instructions.value,
                    userId: auth.userId
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                })
            setDisplay(responseData.instructions)
            setShow(false)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <React.Fragment>
            <Modal
                className='instructions-modal'
                onCancel={instructionsHandler}
                show={show}
                footer={<Button onClick={formHandler}>Done</Button>}
            >
                <Input
                    label='delivery instructions'
                    lableStyle={{ fontSize: "1.2rem", letterSpacing: "1.5px" }}
                    style={{ resize: "none" }}
                    element='textarea'
                    id='instructions'
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