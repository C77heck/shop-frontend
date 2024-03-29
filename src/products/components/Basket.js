import React, {
    useState,
    useEffect,
    useContext
} from 'react';

import { AuthContext } from '../../shared/context/auth-context';

import { PurchaseContext } from '../../shared/context/purchase-context';

import Auth from '../../users/components/Auth';
import Modal from '../../shared/UIElements/Modal';
import CheckoutList from './CheckoutList';
import { priceDisplay } from '../../shared/utility/priceOutput';

import BasketIcon from '../../products/components/BasketIcon';

import './Basket.css'


export const BasketModal = props => {
    return (
        <Modal
            className='basket-modal'
            header={'Products'}
            onCancel={props.onClear}
            show={!!props.show}
        >
            {props.children}
        </Modal>
    )
}


const Basket = props => {
    const { isLoggedIn } = useContext(AuthContext);

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
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (isLoggedIn) {


            if (basket) {
                const { beforeDot, afterDot } = priceDisplay(price)


                setDisplay({
                    beforeDot: beforeDot,
                    afterDot: afterDot,
                    amount: amount
                })

                if (price > 99) {
                    setStyle({
                        beforeDotStyle: { fontSize: '1rem' },
                        afterDotStyle: { fontSize: '0.6rem' },
                        amountStyle: { fontSize: '0.6rem' }
                    })
                } else {
                    setStyle({
                        beforeDotStyle: {},
                        afterDotStyle: {},
                        amountStyle: {}
                    })
                }
            }
        } else {

            setDisplay({
                beforeDot: '00',
                afterDot: '.00',
                amount: '0'
            })
        }
    }, [basket, price, amount, isLoggedIn])

    const basketHandler = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
        } else {
            setShowModal(true)
        }
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <React.Fragment>
            <BasketModal show={showModal} onClear={closeModal} >
                <CheckoutList items={props.items} />
            </BasketModal>
            <Auth>
                <button className="basket-btn" name="checkout" type="button" onClick={basketHandler}>
                    <BasketIcon />
                    <span style={style.beforeDotStyle} className="cart-value-large">
                        {beforeDot.length < 2 ? '0' + beforeDot : beforeDot}
                    </span>
                    <span style={style.afterDotStyle} className="cart-value-small">
                        {afterDot.length < 3 ? afterDot + '0' : afterDot}
                    </span>
                    <span style={style.amountStyle} className="cart-amount">
                        {display.amount || 0}
                    </span>
                </button>
            </Auth>
        </React.Fragment>
    )

}

export default Basket;

