import React from 'react';
import { Link } from 'react-router-dom';


import './CheckoutButton.css';


const CheckoutButton = () => {


    return (
        <div>
            <Link to='/checkout'>
                <button className='checkout'>Checkout</button>
            </Link>
        </div>
    )
}



export default CheckoutButton;