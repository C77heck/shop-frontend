import React, { useReducer, useEffect } from 'react';

import { validate } from '../utility/validators';

import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: validate(action.value, action.validators)
            }
        default:
            return state;
    }
}




const InputComponent = props => {

    /*  const [inputState, dispatch] = useReducer(inputReducer, {
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
  
      const { id, onInput } = props;
      const { value, isValid } = inputState;
  
      useEffect(() => {
          onInput(id, value, isValid);
      }, [id, value, isValid, onInput]);
    */


    return (
        <div className={`input-control ${!props.validity && 'input-control--invalid'}`}>
            <label htmlFor={props.property}>{props.property}</label>
            <input
                id={props.id}
                placeholder={props.placeholder}
                onChange={props.onChange}
                type={props.type}
                value={props.value}
                name={props.name}
                className={props.className}
                validators={props.validators}
            />
            {!props.validity && <p>{props.errorText}</p>}

        </div>
    )

}


export default InputComponent;

