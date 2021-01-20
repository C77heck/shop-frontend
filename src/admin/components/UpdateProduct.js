import React, { useContext, useState } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import Input from '../../shared/form-elements/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_REQUIRE } from '../../shared/utility/validators';
import ImageUpload from '../../shared/form-elements/ImageUpload';
import Button from '../../shared/UIElements/Button';
import MessageModal from '../../shared/UIElements/MessageModal';


import './Admin.css'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import { AdminContext } from '../../shared/context/admin-context';

const UpdateProduct = () => {

    const { adminId, isAdminLoggedIn } = useContext(AdminContext)

    const [inputState, inputHandler, isFormValid, setFormData] = useForm({
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

    const { sendRequest, isLoading, error, clearError, applicationError } = useHttpClient();

    const [isProductLoad, setIsProductLoad] = useState(false)
    const [message, setMessage] = useState('')
    const onClearHandler = () => {
        setMessage('')
    }


    const updateProductHandler = async e => {
        e.preventDefault();
        try {
            if (!isAdminLoggedIn) {
                throw new Error('You need to login first!')
            }
            const formData = new FormData();
            formData.append('name', inputState.inputs.nameUpdate.value);
            formData.append('unit', inputState.inputs.unitUpdate.value);
            formData.append('price', inputState.inputs.priceUpdate.value);
            formData.append('image', inputState.inputs.imageUpdate.value);
            formData.append('code', inputState.inputs.codeUpdate.value)
            const responseData = await sendRequest(
                process.env.REACT_APP_BACKEND + adminId,
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

            applicationError(err.message)

        }

    }

    const getProductData = async e => {
        e.preventDefault()

        try {
            if (!isAdminLoggedIn) {
                throw new Error('You need to login first!')
            }
            const responseData = await sendRequest(
                process.env.REACT_APP_PRODUCT + inputState.inputs.codeUpdate.value
            )
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
            applicationError(err.message)

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
                                onInput={inputHandler}
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
                                onInput={inputHandler}
                                value={inputState.inputs.nameUpdate.value}
                                errorText='Please enter the product name'
                                validators={[VALIDATOR_REQUIRE()]}
                                type='text'
                            />
                            <Input
                                id='unitUpdate'
                                label='Unit'
                                onInput={inputHandler}
                                value={inputState.inputs.unitUpdate.value}
                                errorText='Please enter a value such as litre, kg, pack... etc'
                                validators={[VALIDATOR_REQUIRE()]}
                                type='text'
                            />
                            <Input
                                id='priceUpdate'
                                label='Product price'
                                onInput={inputHandler}
                                value={inputState.inputs.priceUpdate.value}
                                errorText="Please enter the product's price"
                                validators={[VALIDATOR_REQUIRE()]}
                                type='text'
                            />

                            <div>
                                <ImageUpload
                                    id='imageUpdate'
                                    onInput={inputHandler}
                                    errorText='Please provide an image.'
                                    img={inputState.inputs.imageUpdate.value}
                                />
                            </div>
                            <Button
                                disabled={isFormValid}
                            >UPDATE</Button>
                            <p
                                href=''
                                className='update-product__cancel'
                                onClick={() => { setIsProductLoad(false) }}>Cancel</p>
                        </form>}
                </div>
            </div>


        </React.Fragment>

    )

}


export default UpdateProduct;


