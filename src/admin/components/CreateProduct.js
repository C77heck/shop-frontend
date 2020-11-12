import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import FormComponent from '../../shared/UIElements/FormComponent'
import InputComponent from '../../shared/UIElements/InputComponent'
import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import ImageUpload from '../../shared/form-elements/ImageUpload'
import { useForm } from '../../shared/hooks/form-hook'

import './Admin.css'


const CreateProduct = () => {

    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm({
        image: {
            value: null,
            isValid: false
        }
    });
    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    const [input, setInput] = useState({
        name: '',
        unit: '',
        price: ''
    })
    const onChangeHandler = event => {

        const { name, value } = event.target;

        setInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }



    const addProductHandler = async event => {
        event.preventDefault();

        try {

            const formData = new FormData();
            formData.append('name', input.name);
            formData.append('unit', input.unit);
            formData.append('price', input.price);
            formData.append('image', formState.inputs.image.value);


            await sendRequest(
                'http://localhost:2000/api/products',
                'POST',
                formData
            );
            setInput({
                name: '',
                unit: '',
                price: ''
            })
            history.push('/');
            history.push('/admin');


        } catch (err) {

        }
    }


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <div className='form-element_outer'>
                <div className='form-element'>
                    <h2>Add new product</h2>
                    <FormComponent onSubmit={addProductHandler} buttonText='ADD' >
                        <InputComponent onChange={onChangeHandler} value={input.name} property='name' type='text' />
                        <InputComponent onChange={onChangeHandler} property='unit' value={input.unit} type='text' />
                        <InputComponent onChange={onChangeHandler} property='price' value={input.price} type='number' />
                        <div>
                            <ImageUpload id='image' onInput={inputHandler} errorText='Please provide an image.' />
                        </div>

                    </FormComponent>
                </div>
            </div>

        </React.Fragment>

    )

}


export default CreateProduct;