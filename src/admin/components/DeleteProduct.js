import React, { useState } from 'react';

import FormComponent from '../../shared/UIElements/FormComponent'
import InputComponent from '../../shared/UIElements/InputComponent'
import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/UIElements/ErrorModal'

import './Admin.css'


const CreateProduct = () => {

    const [input, setInput] = useState({ code: '' })
    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    const onChangeHandler = event => {

        const { name, value } = event.target;

        setInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
        console.log(input)
    }

    const deleteProductHandler = async (event) => {
        event.preventDefault();
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND + input.code,
                'DELETE'
            )
            setInput({ code: '' })
        } catch (err) {

        }

    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <div className='form-element_outer'>
                <div className='form-element'>
                    <h2>delete product</h2>
                    <FormComponent onSubmit={deleteProductHandler} buttonText='DELETE' >
                        <InputComponent onChange={onChangeHandler} value={input.code} property='code' type='number' />
                    </FormComponent>
                </div>
            </div>
        </React.Fragment>

    )

}


export default CreateProduct;

