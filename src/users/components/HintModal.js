import React from 'react'

import { VALIDATOR_REQUIRE } from '../../shared/utility/validators';
import Input from '../../shared/form-elements/Input'
import Modal from '../../shared/UIElements/Modal'
import Button from '../../shared/UIElements/Button';




const HintModal = props => {


    return (

        <Modal
            className='hint-modal'
            header='Security question'
            onCancel={props.onClear}
            show={props.show}
            onSubmit={props.onSubmit}

        >
            {props.message ? <h2>{props.message}</h2>
                :
                <div>
                    <h3>{props.value.hint.value}</h3>
                    <Input
                        id='answer'
                        label='Security answer'
                        onInput={props.onInput}
                        value={props.value.answer.value}
                        errorText='Please enter your asnwer'
                        validators={[VALIDATOR_REQUIRE()]}
                        type='text'
                    />
                    <Button
                        disabled={!props.value.answer.valid}
                    >Submit</Button>
                </div>}
        </Modal>

    )
}


export default HintModal;