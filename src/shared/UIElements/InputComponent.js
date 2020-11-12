import React from 'react';


const InputComponent = props => {




    return (
        <div>
            <label htmlFor={props.property}>{props.property}</label>
            <input placeholder={props.placeholder} onChange={props.onChange} type={props.type} value={props.value} name={props.property} />
        </div>
    )

}


export default InputComponent;

