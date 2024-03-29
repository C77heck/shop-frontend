import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import Auth from './Auth';
import { AuthContext } from '../../shared/context/auth-context';
import UserIcon from './UserIcon';


const AuthButton = props => {
    const history = useHistory();
    const { isLoggedIn, signout, userId } = useContext(AuthContext);

    const signoutHandler = async () => {
        const { pathname } = history.location;
        const isSignoutDone = signout()
        if (isSignoutDone) {
            if (pathname === '/checkout' || pathname === '/myaccount'
                || pathname === `/userdata/${userId}` || pathname === `/orderhistory/${userId}`) {
                history.push('/')
            }
        }

    }

    return (
        <Auth className={props.className}>
            <div className='auth-container'>
                <button
                    className='auth-button'
                    onClick={isLoggedIn ? signoutHandler : undefined}
                >
                    <UserIcon />
                    <span>{isLoggedIn ? 'LOG OUT' : 'SIGN IN'}</span>
                </button>
            </div>
        </Auth>

    )
}

export default AuthButton