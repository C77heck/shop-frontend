import React, { useEffect, useState, useContext } from 'react';

import BuyButton from './BuyButton';

import { PurchaseContext } from '../../shared/context/purchase-context';

import './CheckoutList.css';




const ProductItem = props => {


    const checkoutPrice = props.totalPrice;

    const [price, setPrice] = useState({
        beforeDot: '',
        afterDot: ''
    });

    useEffect(() => {

        if (checkoutPrice > 0) {
            if (checkoutPrice % 1 === 0) {
                setPrice({
                    beforeDot: String(checkoutPrice),
                    afterDot: '.00'
                })
            } else {
                setPrice(() => {
                    let index = String(checkoutPrice).indexOf(".");
                    let bDot = String(checkoutPrice).slice(0, index);
                    let aDot = String(checkoutPrice).slice(index, index + 3);
                    return {
                        beforeDot: bDot,
                        afterDot: aDot
                    }
                })
            }
        } else {
            setPrice({
                beforeDot: '00',
                afterDot: '00'
            })
        }

    }, [checkoutPrice])


    return (

        <div className={`${!props.show && 'invisible'} checkout-product__card`}>
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
    const { basketContent } = useContext(PurchaseContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        try {
            if (products.length < 1) {
                setProducts(JSON.parse(localStorage.getItem('basketContent')).products)
            } else {
                setProducts(basketContent.products);
            }
        } catch (err) {
            console.log(err)
        }

    }, [basketContent])

    return (
        <div className='checkout-list'>
            <div className='products-header'>
                <div style={{ flexBasis: "60%" }}><p>Product</p></div>
                <div style={{ flexBasis: "25%" }}><p>Quantity</p></div>
                <div style={{ flexBasis: "15%" }}><p>Price</p></div>
            </div>
            {products.map(product => {
                if (product.number > 0) {
                    return (
                        <ProductItem
                            key={product.id}
                            id={product.id}
                            number={product.number}
                            name={product.name}
                            unit={product.unit}
                            price={product.price}
                            totalPrice={product.totalPrice}
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
                            totalPrice={product.totalPrice}
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