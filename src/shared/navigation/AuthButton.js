import React from 'react';

import './AuthButton.css'

const AuthButton = props => {

    const button = (<button
        className={props.className}
        onClick={props.switch ? props.signout : props.signin}
    >
        <img src="/images/icons/user-other.svg" alt="user icon" />
        <span>{props.switch ? 'SIGN OUT' : 'SIGN IN'}</span>
    </button>)
    return button


}


export default AuthButton;