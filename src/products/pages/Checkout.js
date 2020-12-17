import React, { useState } from 'react';

import CheckoutList from '../components/CheckoutList';
import BookDelivery from '../components/BookDelivery';

import './Checkout.css'
import 'react-calendar/dist/Calendar.css'

const Checkout = () => {



    return (
        <React.Fragment>

            <div className='checkout-layout'>
                <div
                    style={{ flexBasis: "40%", width: "40%" }}
                    className='flex-containers'
                >
                    <CheckoutList />
                </div>
                <div style={{ flexBasis: "40%", width: "40%", overflow: "hidden" }}
                    className='flex-containers'
                >
                    <BookDelivery />
                </div>
                <div style={{ flexBasis: "20%", width: "20%" }}
                    className='flex-containers'
                >

                </div>
            </div>

        </React.Fragment>
    )
}


export default Checkout;


