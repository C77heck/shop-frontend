import React, { useState } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/UIElements/ErrorModal'

import Input from '../../shared/form-elements/Input';
import { useInput } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../shared/utility/validators';

import './Admin.css'
import Button from '../../shared/UIElements/Button';
import MessageModal from '../../shared/UIElements/MessageModal';


const DeleteProduct = () => {

    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    const [inputState, handler, isFormValid] = useInput({
        code: {
            value: '',
            valid: true
        }
    })
    const [message, setMessage] = useState('')
    const onClearHandler = () => {
        setMessage('')
    }

    const deleteProductHandler = async (e) => {
        e.preventDefault();
        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND
                + '/' +
                inputState.inputs.code.value,
                'DELETE'
            )
            setMessage(responseData.message)
        } catch (err) {

        }

    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <MessageModal
                header='Success'
                onClear={onClearHandler}
                message={message}
            />
            {isLoading && <LoadingSpinner asOverlay />}
            <div className='form-element_outer'>
                <div className='form-element'>
                    <h2>delete product</h2>
                    <form onSubmit={deleteProductHandler} >
                        <Input
                            id='code'
                            label='Product code'
                            errorText='Please enter a product code'
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                            onInput={handler}
                            value={inputState.inputs.code.value}
                        />
                        <Button>DELETE</Button>
                    </form>
                </div>
            </div>
        </React.Fragment>

    )

}


export default DeleteProduct;

