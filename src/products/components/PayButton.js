import React, { useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { PurchaseContext } from '../../shared/context/purchase-context';

import './PayButton.css'

const PayButton = props => {

    const auth = useContext(AuthContext)

    const { basket } = useContext(PurchaseContext);
    const { sendRequest } = useHttpClient();

    const history = useHistory();

    const payHandler = async () => {
        try {

            const responseData = await sendRequest(
                process.env.REACT_APP_ORDERS,
                'POST',
                JSON.stringify({
                    products: basket,
                    dateOrdered: new Date(),
                    dateToBeDelivered: props.datePicked,
                    creator: auth.userId
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            )
            console.log(responseData)
            history.push('/')

        } catch (err) {

        }
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