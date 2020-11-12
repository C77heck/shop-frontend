import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { PurchaseContext } from '../../shared/context/purchase-context'

import './CheckoutButton.css';


const CheckoutButton = () => {

    const purchase = useContext(PurchaseContext);


    localStorage.setItem(
        'basketContent',
        JSON.stringify({
            products: purchase.basketItems.map(i => {
                if (i.code === purchase.code) {
                    i.number = purchase.number
                    return i;
                }
                return i;
            })
        })
    );





    return (
        <div>
            <Link to='/checkout'>
                <button className='checkout'>Checkout</button>
            </Link>
        </div>
    )
}



export default CheckoutButton;