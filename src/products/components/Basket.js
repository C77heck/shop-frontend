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

        const { beforeDot, afterDot } = priceDisplay(price)
        setDisplay({
            beforeDot: beforeDot,
            afterDot: afterDot,
            amount: amount
        })

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
                    <button className="basketButton" name="checkout" type="button" onClick={basketHandler}>
                        <img className="basket-icon" src="/images/icons/basket.png" alt="basket" />
                        <span style={style.beforeDotStyle} className="cartValue">
                            {beforeDot.length < 2 ? '0' + beforeDot : beforeDot}
                        </span>
                        <span style={style.afterDotStyle} className="cartValue2">
                            {afterDot.length < 3 ? afterDot + '0' : afterDot}
                        </span>
                        <span style={style.amountStyle} className="cartCont">
                            {display.amount || 0}
                        </span>
                    </button>
                </Auth>
        </React.Fragment>
    )

}

export default Basket;

