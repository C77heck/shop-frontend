import React, { useContext, useState } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import ImageUpload from '../../shared/form-elements/ImageUpload'
import { useForm } from '../../shared/hooks/form-hook'
import Input from '../../shared/form-elements/Input';
import { VALIDATOR_REQUIRE } from '../../shared/utility/validators';
import Button from '../../shared/UIElements/Button';
import MessageModal from '../../shared/UIElements/MessageModal';
import { AdminContext } from '../../shared/context/admin-context';

import './Admin.css'


const CreateProduct = () => {

    const { adminId, isAdminLoggedIn } = useContext(AdminContext);

    const { sendRequest, isLoading, error, clearError, applicationError } = useHttpClient();

    const [inputState, inputHandler, isFormValid, setFormData] = useForm({
        image: {
            value: null,
            valid: false
        },
        name: {
            value: '',
            valid: false
        },
        unit: {
            value: '',
            valid: false
        },
        price: {
            value: '',
            valid: false
        }
    });

    const [message, setMessage] = useState('')
    const onClearHandler = () => {
        setMessage('')
    }


    const addProductHandler = async e => {
        e.preventDefault();

        try {
            if (!isAdminLoggedIn) {
                throw new Error('You need to login first!');
            }
            const formData = new FormData();
            formData.append('name', inputState.inputs.name.value);
            formData.append('unit', inputState.inputs.unit.value);
            formData.append('price', inputState.inputs.price.value);
            formData.append('image', inputState.inputs.image.value);

            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND + adminId,
                'POST',
                formData
            );

            setMessage(responseData.message)

            setFormData({
                image: {
                    value: null,
                    valid: false
                },
                name: {
                    value: '',
                    valid: false
                },
                unit: {
                    value: '',
                    valid: false
                },
                price: {
                    value: '',
                    valid: false
                }
            })
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
                    <h2>Add new product</h2>
                    <form onSubmit={addProductHandler}  >
                        <Input
                            id='name'
                            label='Product name'
                            onInput={inputHandler}
                            value={inputState.inputs.name.value}
                            errorText='Please enter the product name'
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                        />

                        <Input
                            id='unit'
                            label='Unit'
                            onInput={inputHandler}
                            value={inputState.inputs.unit.value}
                            errorText='Please enter a value such as litre, kg, pack... etc'
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                        />
                        <Input
                            id='price'
                            label='Product price'
                            onInput={inputHandler}
                            value={inputState.inputs.price.value}
                            errorText="Please enter the product's price"
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                        />
                        <div>
                            <ImageUpload
                                id='image'
                                onInput={inputHandler}
                                errorText='Please provide an image.'
                            />
                        </div>
                        <Button
                            disabled={isFormValid}
                        >ADD</Button>
                    </form>
                </div>
            </div>

        </React.Fragment>

    )

}


export default CreateProduct;