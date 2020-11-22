import React, { useState, useEffect, useCallback } from 'react';

import { validate } from '../utility/validators';

import './Input.css';


const Input = props => {
    const [isValid, setIsValid] = useState('true');
    const [boolean, setBoolean] = useState(true);
    const [onFocus, setOnFocus] = useState(false); //managing element validation neccesity for the UI
    
    const { value, validators, onInput, id, valid } = props

    useEffect(() => {
        if (id === 'passwordAgain') {
            if (value === '') {
                setIsValid('true')
            } else {
                setIsValid(() => {
                    if (props.password === value) {
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

    }, [value, validators, valid, boolean, id, isValid])

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



    return (
        <div className={`input-control ${!boolean ? 'input-control--invalid' : 'other'}`}>
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
                password={props.password}
                onBlur={onBlurHandler}
            />
            <div className='error-text' >
                <p > {!boolean && props.errorText} </p>

            </div>

        </div>
    )

}


export default Input;

