import React, { useEffect } from 'react';

import { useHistory } from 'react-router-dom'

import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import Input from '../../shared/form-elements/Input';
import { useInput } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../shared/utility/validators';
import ImageUpload from '../../shared/form-elements/ImageUpload';

import './Admin.css'
import Button from '../../shared/UIElements/Button';

const UpdateProduct = () => {



    const history = useHistory();

    const [inputState, handler] = useInput({
        nameUpdate: {
            value: '',
            valid: false
        },
        unitUpdate: {
            value: '',
            valid: false
        },
        priceUpdate: {
            value: '',
            valid: false
        },
        codeUpdate: {
            value: '',
            valid: false
        },
        imageUpdate: {
            value: null,
            valid: false
        }
    })
    const { sendRequest, error, clearError } = useHttpClient();

    const updateProductHandler = async e => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', inputState.inputs.nameUpdate.value);
            formData.append('unit', inputState.inputs.unitUpdate.value);
            formData.append('price', inputState.inputs.priceUpdate.value);
            formData.append('code', inputState.inputs.codeUpdate.value);
            formData.append('image', inputState.inputs.imageUpdate.value);
            await sendRequest(
                process.env.REACT_APP_BACKEND
                + '/' +
                inputState.inputs.code.value,
                'PATCH',
                JSON.stringify({
                    name: inputState.inputs.name.value,
                    unit: inputState.inputs.unit.value,
                    price: inputState.inputs.price.value
                }),
                { 'Content-Type': 'application/json' }
            )
            history.push('/')
            history.push('/admin')
        } catch (err) {
        }

    }


    return (
        <React.Fragment>


            <ErrorModal error={error} onClear={clearError} />

            <div className='form-element_outer'>
                <div className='form-element'>
                    <h2>Update existing product</h2>
                    <form onSubmit={updateProductHandler} >
                        <Input
                            id='nameUpdate'
                            label='Product name'
                            onInput={handler}
                            value={inputState.inputs.nameUpdate.value}
                            errorText='Please enter the product name'
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                        />
                        <Input
                            id='unitUpdate'
                            label='Unit'
                            onInput={handler}
                            value={inputState.inputs.unitUpdate.value}
                            errorText='Please enter a value such as litre, kg, pack... etc'
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                        />
                        <Input
                            id='priceUpdate'
                            label='Product price'
                            onInput={handler}
                            value={inputState.inputs.priceUpdate.value}
                            errorText="Please enter the product's price"
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                        />
                        <Input
                            id='codeUpdate'
                            label='Product code'
                            onInput={handler}
                            value={inputState.inputs.codeUpdate.value}
                            errorText="Please enter a new product code"
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                        />
                        <div>
                            <ImageUpload
                                id='imageUpdate'
                                onInput={handler}
                                errorText='Please provide an image.'
                            />
                        </div>
                        <Button>UPDATE</Button>
                    </form>
                </div>
            </div>


        </React.Fragment>

    )

}


export default UpdateProduct;


