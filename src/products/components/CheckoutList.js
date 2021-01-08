import React, { useContext, useEffect, useState } from 'react';

import BuyButton from './BuyButton';
import { priceDisplay } from '../../shared/utility/priceOutput';


import './CheckoutList.css';
import { PurchaseContext } from '../../shared/context/purchase-context';

const ProductItem = props => {
    const purchase = useContext(PurchaseContext)
    const [invisible, setInvisible] = useState(false);
    const [price, setPrice] = useState({
        beforeDot: '',
        afterDot: ''
    });
    const { items, code, number, totalPrice } = props;


    useEffect(() => {
        if (number > 0) {
            setInvisible(true)
        } else {
            setInvisible(false)
        }
    }, [number])

    const deleteHandler = e => {
        e.preventDefault();
        purchase.deleteItem(items, code)
        setInvisible(false)
    }


    useEffect(() => {
        const { beforeDot, afterDot } = priceDisplay(totalPrice)
        setPrice({
            beforeDot: beforeDot,
            afterDot: afterDot
        })
    }, [totalPrice, setPrice])


    return (

        <div className={`${!invisible && 'invisible'} checkout-product__card`}>
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
            <div 
            className='checkout-product__info'
            style={{ flexBasis: "40%", margin: "0.2rem", textAlign: "center" }}
            >

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
            <div style={{ position: "relative", flexBasis: "15%", textAlign: "center" }}>
                <button
                    onClick={deleteHandler}
                    className='cancel-item__button'
                    style={{display: `${props.noShow ? 'none' : 'unset'}`}}
                >
                    <img name='cancel-button' src="/images/icons/cancel.svg" alt="cancel icon" />
                </button>
                <p className='checkout-price'>
                    <span >
                        £{price.beforeDot.length < 2 ? '0' + price.beforeDot : price.beforeDot}
                    </span>
                    <span>
                        {price.afterDot.length < 3 ? price.afterDot + '0' : price.afterDot}
                    </span>
                </p>
            </div>
        </div>
    )
}

const CheckoutList = props => {

    const { basket } = useContext(PurchaseContext);

    const [items, setItems] = useState([])

    useEffect(() => {
        if (basket) {
            setItems(props.items);
        }

    }, [basket, props.items])




    return (
        <React.Fragment>
            <div className='products-header'>
                <div style={{ flexBasis: "60%" }}><p>Product</p></div>
                <div style={{ flexBasis: "25%" }}><p>Quantity</p></div>
                <div style={{ flexBasis: "15%" }}><p>Price</p></div>
            </div>

            <div className='checkout-list'>

                {basket.amount === 0 ? <p style={{ textAlign: "center" }}>Your basket is empty</p> :
                    items.map(product => {
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
                                items={items}
                                noShow={props.noShow}
                            />)
                    })}
            </div>
        </React.Fragment>
    )
}


export default CheckoutList;

