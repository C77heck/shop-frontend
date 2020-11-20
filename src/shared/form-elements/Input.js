import React, { useState, useEffect } from 'react';

import { validate } from '../utility/validators';

import './Input.css';


const Input = props => {
    const [isValid, setIsValid] = useState('true');
    const { value, validators, onInput, id } = props

    useEffect(() => {

        if (value === '') {
            setIsValid('true')
        } else {
            setIsValid(() => {
                if (validate(value, validators)) {
                    return 'true'
                } else {
                    return 'false'
                }
            })
        }
    }, [value, validators])

    const onChangeHandler = e => {

        const validators = e.target.attributes.getNamedItem('valid').value
        const { id, value } = e.target;
        onInput(id, value, validators);
    }

    return (
        <div className={`input-control ${!isValid && 'input-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                placeholder={props.placeholder}
                onChange={onChangeHandler}
                type={props.type}
                value={props.value}
                name={props.id}
                className={props.className}
                validators={props.validators}
                valid={isValid}
            />
            {!isValid && <p>{props.errorText}</p>}

        </div>
    )

}


export default Input;

