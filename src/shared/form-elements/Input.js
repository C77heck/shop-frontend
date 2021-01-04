import React, { useState, useEffect } from 'react';

import { validate } from '../utility/validators';

import './Input.css';


const Input = props => {

    const [isValid, setIsValid] = useState(true);
    const [errorTextShow, setErrorTextShow] = useState(true);

    const { validators, onInput } = props

    const onChangeHandler = e => {
        const { id, value } = e.target;
        let validator;

        if (id === 'passwordAgain') {
            validator = (() => {
                return e.target.attributes.getNamedItem('password').value === value ?
                    true
                    :
                    false
            })()
        } else {
            if (id === 'instructions') {
                validator = true;
            } else {
                validator = validate(value, validators)
            }
        }
        setIsValid(validator)
        onInput(id, value, validator);
    }



    const onBlurHandler = () => {
        setErrorTextShow(isValid)
    }
    const onFocusHandler = () => {
        setErrorTextShow(true)
    }

    const element = props.element === 'textarea' ? (<textarea
        style={props.style}
        id={props.id}
        rows={props.rows || 5}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
        value={props.value}
        valid={isValid.toString()}
        className={props.className}
    />) : (
            <input
                style={props.style}
                id={props.id}
                placeholder={props.placeholder}
                onChange={onChangeHandler}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                type={props.type}
                value={props.value}
                name={props.id}
                className={props.className}
                validators={props.validators}
                valid={isValid.toString()}
                password={props.password}

            />)

    return (
        <div
            className={` ${props.contClass} input-control ${!errorTextShow ? 'input-control--invalid' : 'other'}`}
            style={props.containerStyle}
        >
            <label style={props.labelStyle} htmlFor={props.id}>{props.label}</label>
            {element}
            <div className='error-text' >
                <p > {!errorTextShow && props.errorText} </p>

            </div>

        </div>
    )

}


export default Input;

