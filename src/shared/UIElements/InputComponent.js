import React, { useReducer } from 'react';

import { validate } from '../utility/validators';

import '../form-elements/Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: validate(action.val, action.validators)
            }
        default:
            return state;
    }
}



const InputComponent = props => {

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: false
    });

    const changeHandler = e => {
        dispatch({
            type: 'CHANGE',
            value: e.target.value,
            validators: props.validators
        })
    }




    return (
        <div>
            <label htmlFor={props.property}>{props.property}</label>
            <input
                placeholder={props.placeholder}
                onChange={props.onChange}
                type={props.type}
                value={props.value}
                name={props.name}
                className={props.className}
                validators={props.validators}
            />
        </div>
    )

}


export default InputComponent;

