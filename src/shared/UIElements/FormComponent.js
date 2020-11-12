import React from 'react';

import Button from './Button';

import './FormComponent.css'

const FormComponent = props => {


    return (
        <div className='form-element_container'>


            <form onSubmit={props.onSubmit} >
                {props.children}

                <Button>{props.buttonText}</Button>


            </form>
        </div>
    )

}


export default FormComponent;