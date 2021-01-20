import React, { useContext, useState } from 'react';
import { AdminContext } from '../../shared/context/admin-context';
import ImageUpload from '../../shared/form-elements/ImageUpload';
import Input from '../../shared/form-elements/Input';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Button from '../../shared/UIElements/Button';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import Modal from '../../shared/UIElements/Modal';
import { VALIDATOR_REQUIRE } from '../../shared/utility/validators';

import './Upload.css';

const Upload = () => {

    const { adminId } = useContext(AdminContext);//fix it..
    const { sendRequest, error, clearError } = useHttpClient()
    const [inputState, inputHandler, isFormValid, setFormData] = useForm({
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
    const [message, setMessage] = useState('')
    const onSubmitHandler = async e => {
        e.preventDefault();
        try {

            const formData = new FormData();
            formData.append('name', inputState.inputs.name.value)
            formData.append('resourcePlace', inputState.inputs.resourcePlace.value)
            formData.append('image', inputState.inputs.image.value)

            const responseData = await sendRequest(
                process.env.REACT_APP_RESOURCE_UPLOADS + '5ffd711652164771c3ac5346',
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

        }
    }





    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Modal
                show={!!message}
                onCancel={() => setMessage('')}
            >
                <h3>{message}</h3>
            </Modal>
            <div className='resources-upload__container'>
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
                    <Input
                        id='resourcePlace'
                        label='Resource placement'
                        onInput={inputHandler}
                        value={inputState.inputs.resourcePlace.value}
                        errorText='Please provide which resource does it belong to'
                        validators={[VALIDATOR_REQUIRE()]}
                        type='text'
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
        </React.Fragment>
    )

}



export default Upload;