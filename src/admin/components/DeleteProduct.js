import React from 'react';

import { useHistory } from 'react-router-dom'

import FormComponent from '../../shared/UIElements/FormComponent'
import { useHttpClient } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/UIElements/ErrorModal'

import Input from '../../shared/form-elements/Input';
import { useInput } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../shared/utility/validators';

import './Admin.css'


const DeleteProduct = () => {
    const history = useHistory();

    const [inputState, handler] = useInput({
        code: {
            value: '',
            valid: true
        }
    })
    const { sendRequest, isLoading, error, clearError } = useHttpClient();


    const deleteProductHandler = async (e) => {
        e.preventDefault();
        try {
            await sendRequest(
                process.env.REACT_APP_BACKEND
                + '/' +
                inputState.inputs.code.value,
                'DELETE'
            )
            history.push('/')
            history.push('/admin')
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
                        <Input
                            id='code'
                            label='Product code'
                            errorText='Please enter a product code'
                            validators={[VALIDATOR_REQUIRE()]}
                            type='text'
                            onInput={handler}
                            value={inputState.inputs.code.value}
                        />
                    </FormComponent>
                </div>
            </div>
        </React.Fragment>

    )

}


export default DeleteProduct;

