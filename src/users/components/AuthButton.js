import React, { useContext } from 'react';

import Auth from './Auth';
import { AuthContext } from '../../shared/context/auth-context';

const AuthButton = props => {
    
    const { isLoggedIn, signout } = useContext(AuthContext);


    return (
        <Auth>
            <div className='auth-container'>

                <button
                    className={props.className}
                    onClick={isLoggedIn ? signout : undefined}
                >
                    <img src="/images/icons/user-other.svg" alt="user icon" />
                    <span>{isLoggedIn ? 'SIGN OUT' : 'SIGN IN'}</span>
                </button>
            </div>
        </Auth>

    )
}

export default AuthButton