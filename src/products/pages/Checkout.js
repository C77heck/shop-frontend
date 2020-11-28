import React from 'react';


import CheckoutList from '../components/CheckoutList';


import './Checkout.css'


const Checkout = () => {
    let products;
    try {
        products = JSON.parse(localStorage.getItem('basketContent'))
        products = products.products;
    } catch (err) {
        console.log(err)
    }



    return (
        <div className='product-list_checkout'>
            <CheckoutList items={products} />
        </div>
    )
}


export default Checkout;


