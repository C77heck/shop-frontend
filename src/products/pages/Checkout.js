import React, { useContext, useEffect, useState } from 'react';

import CheckoutList from '../components/CheckoutList';
import BookDelivery from '../components/BookDelivery';
import { PurchaseContext } from '../../shared/context/purchase-context';


import 'react-calendar/dist/Calendar.css'
import './Checkout.css'


const Checkout = () => {

    const { basketContent } = useContext(PurchaseContext)

    return (
        <React.Fragment>

            <div className='checkout-layout'>
                <div
                    style={{ flexBasis: "50%" }}
                    className='flex-containers'
                >
                    <CheckoutList items={basketContent.products} />
                </div>
                <div style={{ position: "relative", flexBasis: "50%", overflow: "hidden" }}
                    className='flex-containers'
                >
                    <BookDelivery />

                </div>

            </div>

        </React.Fragment>
    )
}


export default Checkout;


