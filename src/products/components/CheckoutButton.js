import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

import Auth from '../../users/components/Auth';

import './CheckoutButton.css';


const CheckoutButton = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const history = useHistory()
    const checkoutHandler = () => {
        if (!isLoggedIn) {
        } else {
            history.push('/checkout')
        }
    }

    return (
        <div>

            <Auth>
                <button className='checkout' onClick={checkoutHandler}>
                    Checkout
                    </button>

            </Auth>
        </div>
    )
}



export default CheckoutButton;