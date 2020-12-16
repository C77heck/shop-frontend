import React from 'react';

import { useHistory } from 'react-router-dom';

import './PayButton.css'

const PayButton = () => {

    const history = useHistory();

    const payHandler = () => {
        console.log('paid')
        history.push('/')
        /* logic for removing basket items but not logging out. probably a post request to refill the products 
        add a thank you for your purchase page too.
        also there is not item in your basket, to deal with bugs */
    }

    return (

        <button
            className='pay-button'
            onClick={payHandler}
        >checkout</button>
    )
}


export default PayButton;