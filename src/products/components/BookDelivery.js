import React, {
    useEffect,
    useState,
    useContext
} from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';

import { PurchaseContext } from '../../shared/context/purchase-context';
import DeliverPicker from './DeliveryPicker';
import { priceDisplay } from '../../shared/utility/priceOutput';


import './BookDelivery.css';





const BookDelivery = () => {

    const { sendRequest } = useHttpClient();
    const [value, setValue] = useState({
        value: '',
        display: ''
    })
    const [pay, setPay] = useState({
        basket: {
            beforeDot: '',
            afterDot: ''
        },
        savings: '',
        coupons: '',
        total: {
            beforeDot: '',
            afterDot: ''
        }

    })
    const [show, setShow] = useState(false)
    const [userData, setUserData] = useState({
        address: '58A, Carnarvon Road, London, E15 4QW ',
        instructions: 'my address is carnarvon road but ' +
            'my flat entrance is on dormer close. first door on the right.'
    })

    const { basket } = useContext(PurchaseContext);
    const { price } = basket;

    useEffect(() => {
        setPay({
            basket: priceDisplay(price),
            savings: '00.00',
            coupons: '00.00',
            total: priceDisplay(price)
        })
    }, [])

    const cancelHandler = () => {
        setShow(false)
    }

    /*     useEffect(() => {
            (async () => {
                const responseData = await sendRequest(REACT_APP_USERS)
                setUserData({
                    address: responseData.address,
                    instructions: responseData.instructions
                })
            })()
        }, []) */

    const datePickerHandler = () => {
        setShow(true)
    }
    const calendarHandler = (datePicked) => {
        const display = String(datePicked).slice(0, 15)
        console.log(display)
        setValue({
            value: datePicked,
            display: display
        })
        setShow(false)
    }

    return (
        <React.Fragment>
            <DeliverPicker
                onClear={cancelHandler}
                show={show}
                onChange={calendarHandler}
                value={value.datePicked}
            />
            <div className='book-delivery_header'>
                <p>Delivery details</p>
            </div>
            <div className='book-delivery_block'>

                <div style={{ flexBasis: "40%" }}>
                    <p>Delivery time:</p>
                    <p>Delivery address:</p>
                    <p>Delivery instructions:</p>
                </div>
                <div style={{ flexBasis: "60%" }}>
                    <button
                        className='book-delivery_buttons'
                        onClick={datePickerHandler}
                    >{value !== undefined ? value.display + ' change delivery date' : 'book a delivery date'}
                    </button>
                    <p>{userData.address}</p>
                    <p>{userData.instructions}</p>
                    <button className='book-delivery_buttons'>Edit delivery instructions</button>
                </div>
            </div>
            <div className='order-summary'>
                <div className='book-delivery_header'>
                    <p>Order summary</p>
                </div>
                <div className='book-delivery_block'>

                    <div style={{ flexBasis: "40%" }}>
                        <p>Basket total:</p>
                        <p>Includes savings of:</p>
                        <p>Total coupon savings:</p>
                        <h3>Total to pay</h3>
                    </div>
                    <div style={{ flexBasis: "60%" }}>
                        <p>£{pay.basket.beforeDot + pay.basket.afterDot}</p>
                        <p>£{pay.savings}</p>
                        <p>£{pay.coupons}</p>
                        <h3>£{pay.total.beforeDot + pay.total.afterDot}</h3>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )


}


export default BookDelivery;