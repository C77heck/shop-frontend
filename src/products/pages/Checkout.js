import React, { useContext, useEffect, useState } from 'react';

import CheckoutList from '../components/CheckoutList';
import BookDelivery from '../components/BookDelivery';
import { PurchaseContext } from '../../shared/context/purchase-context';


import 'react-calendar/dist/Calendar.css'
import './Checkout.css'


const Checkout = () => {

    const { basketContent } = useContext(PurchaseContext)

    const [products, setProducts] = useState([])
    /* perhaps ommit the useState check for it... */
    useEffect(() => {
        setProducts(basketContent)
    }, [basketContent])

    return (
        <React.Fragment>

            <div className='checkout-layout'>
                <div
                    style={{ flexBasis: "40%", width: "40%" }}
                    className='flex-containers'
                >
                    <CheckoutList items={products} />
                </div>
                <div style={{ position: "relative", flexBasis: "40%", width: "40%", overflow: "hidden" }}
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


