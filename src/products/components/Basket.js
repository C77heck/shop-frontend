import React, { useContext, useEffect } from 'react';

import { PurchaseContext } from '../../shared/context/purchase-context';
import { useStorage } from '../../shared/hooks/storage-hook';

import './Basket.css'



const Basket = () => {

    const purchase = useContext(PurchaseContext)
    const { amount, price } = useStorage();


    // amount of items indicator:




    //Price display logic:

    let beforeDot;
    let afterDot;
    if (price > 0) {
        if (price % 1 === 0) {
            beforeDot = String(price);
            afterDot = '.00'
        } else {

            let index = String(price).indexOf(".")
            beforeDot = String(price).slice(0, index)
            afterDot = String(price).slice(index, index + 3)
            if (afterDot.length < 3) {
                afterDot = afterDot + '0';
            }
        }

    } else {
        beforeDot = '00'
        afterDot = '.00'
    }


    return (
        <div>
            <button className="basketButton" name="checkout" type="button">
                <img className="basket-icon" src="/images/icons/basket.png" alt="basket" />
                <span className="cartValue">{beforeDot.length < 2 ? '0' + beforeDot : beforeDot}</span>
                <span className="cartValue2">{afterDot}</span>
                <span className="cartCont">{amount || 0}</span>
            </button>
        </div>
    )

}

export default Basket;

