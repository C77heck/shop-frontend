import React, { useContext, useState } from 'react';
import { AdminContext } from '../../shared/context/admin-context';
import ImageUpload from '../../shared/form-elements/ImageUpload';
import Input from '../../shared/form-elements/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/UIElements/Button';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import Modal from '../../shared/UIElements/Modal';
import { VALIDATOR_REQUIRE } from '../../shared/utility/validators';
import CustomSelect from '../../users/components/CustomSelect';

import './Upload.css';

const Upload = () => {

    const { adminId, isAdminLoggedIn } = useContext(AdminContext);//fix it..
    const { sendRequest, error, clearError, isLoading, applicationError } = useHttpClient()
    const [inputState, inputHandler, isFormValid, setFormData] = useForm({
        name: {
            value: '',
            valid: false
        },
        image: {
            value: null,
            valid: false
        }
    })
    const [message, setMessage] = useState('')

    const [resourcePlace, setResourcePlace] = useState('')

    const onChangeHandler = e => {
        const value = e.target.value;
        if (value !== '0') {
            setResourcePlace(value)
        }
    }




    const onSubmitHandler = async e => {
        e.preventDefault();
        try {
            if (!isAdminLoggedIn) {
                throw new Error('You need to login first!')
            }

            const formData = new FormData();
            formData.append('name', inputState.inputs.name.value)
            formData.append('resourcePlace', resourcePlace)
            formData.append('image', inputState.inputs.image.value)

            const responseData = await sendRequest(
                process.env.REACT_APP_RESOURCE_UPLOADS + adminId,
                'POST',
                formData
            )

            setMessage(responseData.message)
            setFormData({
                name: {
                    value: '',
                    valid: false
                },
                resourcePlace: {
                    value: '',
                    valid: false
                },
                image: {
                    value: null,
                    valid: false
                }

            })
        } catch (err) {
            applicationError(err.message)
        }
    }





    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            <ErrorModal error={error} onClear={clearError} />
            <Modal
                show={!!message}
                onCancel={() => setMessage('')}
            >
                <h3>{message}</h3>
            </Modal>
            <div className='resources-upload__container'>
                <div className='form-element_outer'>
                    <div className='form-element'>
                        <h2>Add resource</h2>
                        <form onSubmit={onSubmitHandler}>
                            <Input
                                id='name'
                                label='Image name'
                                errorText='Please provide a name.'
                                onInput={inputHandler}
                                value={inputState.inputs.name.value}
                                validators={[VALIDATOR_REQUIRE()]}
                                type='text'
                            />
                            <CustomSelect
                                onChange={onChangeHandler}
                                type='resourcePlace'
                                instruction='Choose a resource place:'

                            />
                            <ImageUpload
                                id='image'
                                onInput={inputHandler}
                                errorText='Please provide an image.'
                            />
                            <Button
                                disabled={isFormValid}
                            >
                                SUBMIT
            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}



export default Upload;