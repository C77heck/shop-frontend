import React, { useState, useEffect } from 'react';

import { validate } from '../utility/validators';

import './Input.css';


const Input = props => {
    const [isValid, setIsValid] = useState('true');
    const [boolean, setBoolean] = useState(true);
    const [onFocus, setOnFocus] = useState(false); //managing element validation neccesity for the UI

    const { value, validators, onInput, id, valid, password } = props

    useEffect(() => {
        if (id === 'passwordAgain') {
            if (value === '') {
                setIsValid('true')
            } else {
                setIsValid(() => {
                    if (password === value) {
                        return 'true'
                    } else {
                        return 'false'
                    }
                })
            }
        } else {
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
        }
        if (onFocus) {
            setBoolean(() => {
                return isValid === 'true' ? true : false;
            })
        }

    }, [value, validators, valid, boolean, id, isValid, onFocus, password])

    const onChangeHandler = e => {
        const { id, value } = e.target;
        let validator;

        if (id === 'passwordAgain') {
            validator = (() => {
                return e.target.attributes.getNamedItem('password').value === value ?
                    'true'
                    :
                    'false'
            })()
        } else {
            validator = e.target.attributes.getNamedItem('valid').value
        }
        onInput(id, value, validator);
    }



    const onBlurHandler = () => {
        setOnFocus(prev => !prev)
        setBoolean(() => {
            return isValid === 'true' ? true : false;
        })
    }

    const element = props.element === 'textarea' ? (<textarea
        style={props.style}
        id={props.id}
        rows={props.rows || 5}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        value={props.value}
        valid={isValid}
        className={props.className}
    />) : (
            <input
                style={props.style}
                id={props.id}
                placeholder={props.placeholder}
                onChange={onChangeHandler}
                type={props.type}
                value={props.value}
                name={props.id}
                className={props.className}
                validators={props.validators}
                valid={isValid}
                password={props.password}
                onBlur={onBlurHandler}
            />)

    return (
        <div className={`input-control ${!boolean ? 'input-control--invalid' : 'other'}`}>
            <label style={props.labelStyle} htmlFor={props.id}>{props.label}</label>
            {element}
            <div className='error-text' >
                <p > {!boolean && props.errorText} </p>

            </div>

        </div>
    )

}


export default Input;

