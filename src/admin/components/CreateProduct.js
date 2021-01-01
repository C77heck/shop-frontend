import React from 'react';
import { useHistory } from 'react-router-dom';

import FormComponent from '../../shared/UIElements/FormComponent'
import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import ImageUpload from '../../shared/form-elements/ImageUpload'
import { useInput } from '../../shared/hooks/form-hook'
import Input from '../../shared/form-elements/Input';

import './Admin.css'
import { VALIDATOR_REQUIRE } from '../../shared/utility/validators';


const CreateProduct = () => {

    const history = useHistory();

    const [inputState, handler, isFormValid] = useInput({
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
    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    const addProductHandler = async e => {
        e.preventDefault();

        try {

            const formData = new FormData();
            formData.append('name', inputState.inputs.name.value);
            formData.append('unit', inputState.inputs.unit.value);
            formData.append('price', inputState.inputs.price.value);
            formData.append('image', inputState.inputs.image.value);

            await sendRequest(
                process.env.REACT_APP_BACKEND,
                'POST',
                formData
            );

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
                        <Input
                            id='name'
                            label='Product name'
                            onInput={handler}
                            value={inputState.inputs.name.value}
                            errorText='Please enter the product name'
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                        />
                        <Input
                            id='unit'
                            label='Unit'
                            onInput={handler}
                            value={inputState.inputs.unit.value}
                            errorText='Please enter a value such as litre, kg, pack... etc'
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                        />
                        <Input
                            id='price'
                            label='Product price'
                            onInput={handler}
                            value={inputState.inputs.price.value}
                            errorText="Please enter the product's price"
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                        />
                        <div>
                            <ImageUpload
                                id='image'
                                onInput={handler}
                                errorText='Please provide an image.'
                            />
                        </div>

                    </FormComponent>
                </div>
            </div>

        </React.Fragment>

    )

}


export default CreateProduct;