import React, { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import Modal from '../../shared/UIElements/Modal';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useInput } from '../../shared/hooks/form-hook';
import Button from '../../shared/UIElements/Button';
import Input from '../../shared/form-elements/Input';


const InstructionsModal = props => {
    const auth = useContext(AuthContext)

    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    /* make the loading conditioning the closing of the modal */
    const [show, setShow] = useState(false)
    const [inputState, handler] = useInput({
        instructions: {
            value: '',
            valid: true
        }
    })
    const formHandler = async e => {
        e.preventDefault();
        console.log(inputState.inputs.instructions.value)
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND,
                'POST',
                JSON.stringify(inputState.instructions.value),
                {
                    Authorization: 'Bearer ' + auth.token
                })

        } catch (err) {

        }
    }


    const clearHandler = () => {
        setShow(false)
    
    }
    useEffect(() => {
        setShow(props.showModal)
    }, [props.showModal])
    console.log(props.showModal)
/* figure how to pass the control to this component. 
propbably should fragment it and take the button to this side as well and then 
just pass the whole thing over to the bookdelivery thingy.
it will work as the auth button does. */
    return (
        <Modal
            className='instructions-modal'
            onCancel={clearHandler}
            show={show}
            header={'delivery instructions'}
            footer={<Button onClick={formHandler}>Yes</Button>}
        >
            <Input
                element='textarea'
                id='instructions'
                label='delivery instructions'
                onInput={handler}
                value={inputState.inputs.instructions.value}
                validators={[]}
            />
        </Modal>
    )
}

export default InstructionsModal;