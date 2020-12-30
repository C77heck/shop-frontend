import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import Auth from './Auth';
import { AuthContext } from '../../shared/context/auth-context';


const AuthButton = props => {

    const history = useHistory();
    const { isLoggedIn, signout } = useContext(AuthContext);

    const signoutHandler = () => {
        const { pathname } = history.location;
        signout()
        if (pathname === '/checkout' || pathname === '/myaccount') {
            history.push('/')
        }

    }

    return (
        <Auth>
            <div className='auth-container'>

                <button
                    className={props.className}
                    onClick={isLoggedIn ? signoutHandler : undefined}
                >
                    <img src="/images/icons/user-other.svg" alt="user icon" />
                    <span>{isLoggedIn ? 'SIGN OUT' : 'SIGN IN'}</span>
                </button>
            </div>
        </Auth>

    )
}

export default AuthButton