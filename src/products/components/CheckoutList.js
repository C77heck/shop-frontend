import React, { useContext, useEffect, useState } from 'react';

import BuyButton from './BuyButton';
import { priceDisplay } from '../../shared/utility/priceOutput';


import './CheckoutList.css';
import { PurchaseContext } from '../../shared/context/purchase-context';


const ProductItem = props => {



    const [price, setPrice] = useState({
        beforeDot: '',
        afterDot: ''
    });
    const checkoutPrice = props.totalPrice;

    useEffect(() => {
        const { beforeDot, afterDot } = priceDisplay(checkoutPrice)
        setPrice({
            beforeDot: beforeDot,
            afterDot: afterDot
        })
    }, [checkoutPrice, setPrice])


    return (

        <div className={`${!props.show && 'invisible'} checkout-product__card`}>
            <div style={{ flexBasis: "20%" }}
                className='checkout_image-container'
            >
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
                    number={props.number}
                />
            </div>
            <div style={{ flexBasis: "15%", margin: "0.2rem", textAlign: "center" }}>
                <p className='checkout-price'>
                    <span className="cartValue">
                        £{price.beforeDot.length < 2 ? '0' + price.beforeDot : price.beforeDot}
                    </span>
                    <span className="cartValue2">
                        {price.afterDot.length < 3 ? price.afterDot + '0' : price.afterDot}
                    </span>
                </p>
            </div>
        </div>
    )
}

const CheckoutList = () => {
    const { basket } = useContext(PurchaseContext);
    const [products, setProducts] = useState([]);
    const storageData = JSON.parse(localStorage.getItem('basketContent')).products
    useEffect(() => {
        try {
            if (products.length < 1) {
                setProducts(storageData)
            }
        } catch (err) {
            console.log(err)
        }

    }, [storageData, products.length])

    return (
        <div className='checkout-list'>
            <div className='products-header'>
                <div style={{ flexBasis: "60%" }}><p>Product</p></div>
                <div style={{ flexBasis: "25%" }}><p>Quantity</p></div>
                <div style={{ flexBasis: "15%" }}><p>Price</p></div>
            </div>
            {basket.amount === 0 ? <p style={{ textAlign: "center" }}>Your basket is empty</p> :
                products.map(product => {
                    if (product.number > 0) {
                        return (
                            <ProductItem
                                key={product.id}
                                id={product.id}
                                number={product.number}
                                name={product.name}
                                unit={product.unit}
                                price={product.price}
                                totalPrice={product.price * product.number}
                                image={product.image}
                                code={product.code}
                                items={products}
                                show={true}
                            />)
                    } else {
                        return (
                            <ProductItem
                                key={product.id}
                                id={product.id}
                                number={product.number}
                                name={product.name}
                                unit={product.unit}
                                price={product.price}
                                totalPrice={product.price * product.number}
                                image={product.image}
                                code={product.code}
                                items={products}
                                show={false}
                            />)
                    }


                })}
        </div>
    )
}


export default CheckoutList;