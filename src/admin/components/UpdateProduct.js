import React, { useState } from 'react';

import FormComponent from '../../shared/UIElements/FormComponent'
import InputComponent from '../../shared/UIElements/InputComponent'
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/UIElements/ErrorModal'


import './Admin.css'

const UpdateProduct = () => {

    const [input, setInput] = useState({
        name: '',
        unit: '',
        price: '',
        code: ''
    })
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

    const updateProductHandler = async event => {
        event.preventDefault();
        console.table(input)
        try {

            await sendRequest(
                process.env.REACT_APP_BACKEND + input.code,
                'PATCH',
                JSON.stringify({
                    name: input.name,
                    unit: input.unit,
                    price: input.price
                }),
                { 'Content-Type': 'application/json' }
            )
            setInput({
                name: '',
                unit: '',
                price: '',
                code: ''
            })
        } catch (err) {
            console.log('something went wrong')
        }

    }


    return (
        <React.Fragment>


            <ErrorModal error={error} onClear={clearError} />

            <div className='form-element_outer'>
                <div className='form-element'>
                    <h2>Update existing product</h2>
                    <FormComponent onSubmit={updateProductHandler} buttonText='UPDATE' >
                        <InputComponent onChange={onChangeHandler} property='code' value={input.code} type='number' />
                        <InputComponent onChange={onChangeHandler} value={input.name} property='name' type='text' />
                        <InputComponent onChange={onChangeHandler} property='unit' value={input.unit} type='text' />
                        <InputComponent onChange={onChangeHandler} property='price' value={input.price} type='number' />
                    </FormComponent>
                </div>
            </div>


        </React.Fragment>

    )

}


export default UpdateProduct;


