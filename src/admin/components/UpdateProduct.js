import React, { useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom'

import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import Input from '../../shared/form-elements/Input';
import { useInput } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../shared/utility/validators';
import ImageUpload from '../../shared/form-elements/ImageUpload';
import Button from '../../shared/UIElements/Button';
import MessageModal from '../../shared/UIElements/MessageModal';


import './Admin.css'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';

const UpdateProduct = () => {



    const history = useHistory();

    const [inputState, handler, isFormValid, setFormData] = useInput({
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

    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    const [isProductLoad, setIsProductLoad] = useState(false)
    const [message, setMessage] = useState('')
    const onClearHandler = () => {
        setMessage('')
    }


    const updateProductHandler = async e => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', inputState.inputs.nameUpdate.value);
            formData.append('unit', inputState.inputs.unitUpdate.value);
            formData.append('price', inputState.inputs.priceUpdate.value);
            formData.append('image', inputState.inputs.imageUpdate.value);
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND + inputState.inputs.codeUpdate.value,
                'PATCH',
                formData
            )
            setIsProductLoad(false)
            setMessage(responseData.message)
            setFormData({
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

        } catch (err) {

            console.log(err)

        }

    }

    const getProductData = async e => {
        e.preventDefault()

        try {
            const responseData = await sendRequest(
                process.env.REACT_APP_PRODUCT + inputState.inputs.codeUpdate.value
            )
            console.log(responseData)
            setFormData({
                nameUpdate: {
                    value: responseData.product.name,
                    valid: true
                },
                unitUpdate: {
                    value: responseData.product.unit,
                    valid: true
                },
                priceUpdate: {
                    value: responseData.product.price,
                    valid: true
                },
                codeUpdate: {
                    value: responseData.product.code,
                    valid: true
                },
                imageUpdate: {
                    value: responseData.product.image,
                    valid: true
                }
            })
            setIsProductLoad(true)
        } catch (err) {

        }
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <MessageModal
                header='Success'
                onClear={onClearHandler}
                message={message}
            />
            <div className='form-element_outer'>
                <div className='form-element'>
                    <h2>Update product</h2>
                    {!isProductLoad ?
                        <form onSubmit={getProductData}>
                            <Input
                                id='codeUpdate'
                                label='Search by product code'
                                onInput={handler}
                                value={inputState.inputs.codeUpdate.value}
                                errorText="Please enter a new product code"
                                validators={[VALIDATOR_REQUIRE()]}
                                type='text'
                            />
                            <Button
                                disabled={!inputState.inputs.codeUpdate.valid}
                            >Search</Button>
                        </form>
                        :
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

                            <div>
                                <ImageUpload
                                    id='imageUpdate'
                                    onInput={handler}
                                    errorText='Please provide an image.'
                                    img={inputState.inputs.imageUpdate.value}
                                />
                            </div>
                            <Button>UPDATE</Button>
                            <a
                                className='update-product__cancel'
                                onClick={() => { setIsProductLoad(false) }}>Cancel</a>
                        </form>}
                </div>
            </div>


        </React.Fragment>

    )

}


export default UpdateProduct;


