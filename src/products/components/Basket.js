import React, {
    useState,
    useEffect,
    useContext
} from 'react';

import { PurchaseContext } from '../../shared/context/purchase-context';

import './Basket.css'

const Basket = () => {

    const { basket } = useContext(PurchaseContext);
    const { price, amount } = basket;
    const [display, setDisplay] = useState({
        beforeDot: '',
        afterDot: '',
        amount: ''
    });
    const { beforeDot, afterDot } = display;

    const [style, setStyle] = useState({
        beforeDotStyle: {},
        afterDotStyle: {},
        amountStyle: {}
    });

    useEffect(() => {
        if (price > 0) {
            if (price % 1 === 0) {
                setDisplay({
                    beforeDot: String(price),
                    afterDot: '.00',
                    amount: amount
                })
            } else {
                let index = String(price).indexOf(".")
                setDisplay({
                    beforeDot: String(price).slice(0, index),
                    afterDot: String(price).slice(index, index + 3),
                    amount: amount
                })
            }
        } else {
            setDisplay({
                beforeDot: '00',
                afterDot: '.00',
                amount: amount
            })
        }
        if (price > 99) {
            setStyle({
                beforeDotStyle: { fontSize: '1.3rem' },
                afterDotStyle: { fontSize: '0.8rem' },
                amountStyle: { fontSize: '0.8rem' }
            })
        } else {
            setStyle({
                beforeDotStyle: {},
                afterDotStyle: {},
                amountStyle: {}
            })
        }
    }, [price, amount])

    return (
        <div>
            <button className="basketButton" name="checkout" type="button">
                <img className="basket-icon" src="/images/icons/basket.png" alt="basket" />
                <span style={style.beforeDotStyle} className="cartValue">{beforeDot.length < 2 ? '0' + beforeDot : beforeDot}</span>
                <span style={style.afterDotStyle} className="cartValue2">{afterDot.length < 3 ? afterDot + '0' : afterDot}</span>
                <span style={style.amountStyle} className="cartCont">{display.amount || 0}</span>
            </button>
        </div>
    )

}

export default Basket;

