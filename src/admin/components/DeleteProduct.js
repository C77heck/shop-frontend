import React, { useContext, useState } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/UIElements/ErrorModal'

import Input from '../../shared/form-elements/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../shared/utility/validators';

import './Admin.css'
import Button from '../../shared/UIElements/Button';
import MessageModal from '../../shared/UIElements/MessageModal';
import { AdminContext } from '../../shared/context/admin-context';


const DeleteProduct = () => {

    const { adminId, isAdminLoggedIn } = useContext(AdminContext)

    const { sendRequest, isLoading, error, clearError, applicationError } = useHttpClient();

    const [inputState, inputHandler, isFormValid] = useForm({
        code: {
            value: '',
            valid: false
        }
    })
    const [message, setMessage] = useState('')
    const onClearHandler = () => {
        setMessage('')
    }

    const deleteProductHandler = async (e) => {
        e.preventDefault();

        try {
            if (!isAdminLoggedIn) {
                throw new Error('you need to login first!')
            }
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND + adminId,
                'DELETE',
                JSON.stringify({
                    code: inputState.inputs.code.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            )
            setMessage(responseData.message)
        } catch (err) {
            applicationError(err.message)
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
                            onInput={inputHandler}
                            value={inputState.inputs.code.value}
                        />
                        <Button
                            disabled={isFormValid}
                        >DELETE</Button>
                    </form>
                </div>
            </div>
        </React.Fragment>

    )

}


export default DeleteProduct;

