import React, { useEffect, useState, useContext } from 'react';

import BuyButton from './BuyButton';

import { PurchaseContext } from '../../shared/context/purchase-context';


import './CheckoutList.css';




const ProductItem = props => {

    const [price, setPrice] = useState();

    const purchase = useContext(PurchaseContext);
    useEffect(() => {
        setPrice(() => { return props.price * props.amount })
    }, [])


    return (

        <div className='checkout-product__card'>
            <div style={{ flexBasis: "20%" }}>
                <div className='checkout-product__image-div'>
                    <img
                        src={process.env.REACT_APP_IMAGE_ROUTE + props.image}
                        alt={props.name}
                    />
                </div>
            </div>
            <div style={{ flexBasis: "40%", margin: "0.2rem", textAlign: "center" }}>

                <p>{props.name}</p>
                <p>{props.code}</p>
                <p>{props.unit}</p>
                {/* price to sort.. */}
            </div>
            <div style={{ flexBasis: "25%", margin: "0.2rem", textAlign: "center" }}>
                <BuyButton
                    className='checkout-list__buyButton'
                    items={props.items}
                    code={props.code}
                    price={props.price}
                />
            </div>
            <div style={{ flexBasis: "15%", margin: "0.2rem", textAlign: "center" }}>
                <p className='checkout-price'>£{price}</p>
            </div>
        </div>
    )
}

const CheckoutList = props => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        try {
            const storageData = JSON.parse(localStorage.getItem('basketContent'))
            setProducts(storageData.products);
        } catch (err) {
            console.log(err)
        }

    }, [localStorage])

    return (
        <div className='checkout-list'>
            <div className='products-header'>
                <div style={{ flexBasis: "60%" }}><p>Product</p></div>
                <div style={{ flexBasis: "25%" }}><p>Quantity</p></div>
                <div style={{ flexBasis: "15%" }}><p>Price</p></div>
            </div>
            {products.map(product => {
                return (
                    <ProductItem
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        unit={product.unit}
                        price={product.price}
                        image={product.image}
                        code={product.code}
                        items={props.items}
                    />
                )
            })}
        </div>
    )
}


export default CheckoutList;