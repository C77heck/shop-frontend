import React, {
    useEffect,
    useState,
    useContext
} from 'react';


import { PurchaseContext } from '../../shared/context/purchase-context';
import { AuthContext } from '../../shared/context/auth-context';
import DeliverPicker from './DeliveryPicker';
import { priceDisplay } from '../../shared/utility/priceOutput';
import InstructionsModal from './InstructionsModal';
import PayButton from './PayButton';

import './BookDelivery.css';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';





const BookDelivery = () => {

    const auth = useContext(AuthContext)
    const { sendRequest, isLoading } = useHttpClient();
    const [value, setValue] = useState({
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
        address: ''
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
    }, [price])

    const cancelHandler = () => {
        setShow(false)
    }

    useEffect(() => {
        (async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_USERS + auth.userId,
                    'GET',
                    null,
                    {
                        Authorization: 'Bearer ' + auth.token,
                        'Content-Type': 'application/json'
                    }
                )
                setUserData({
                    address: `${responseData.userData.address.city} 
                    ${responseData.userData.address.postCode}
                     ${responseData.userData.address.houseNumber} 
                     ${responseData.userData.address.street}`
                })
            } catch (err) {
                console.log(err)
            }

        })()
    }, [sendRequest])

    const datePickerHandler = () => {
        setShow(true)
    }
    const calendarHandler = (datePicked) => {
        const display = String(datePicked).slice(0, 15);
        setValue({
            display: display
        })
        setShow(false)
    }


    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner asOverlay />}

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


                <div className='book-delivery-rows'>
                    <div style={{ flexBasis: "40%" }}>
                        <p>Delivery time:</p>
                    </div>
                    <div style={{ flexBasis: "60%" }}>
                        <button
                            className='book-delivery_buttons'
                            onClick={datePickerHandler}
                        ><span>{value.display}</span>
                            <span className='book-delivery__span'>{value.display === '' ?
                                ' Book a delivery date' : ' Change delivery date'}
                            </span>
                        </button>
                    </div>
                </div>

                <div className='book-delivery-rows'>
                    <div style={{ flexBasis: "40%" }}>
                        <p>Delivery address:</p>
                    </div>
                    <div style={{ flexBasis: "60%" }}>
                        <p>{userData.address}</p>
                    </div>
                </div>

                <div className='book-delivery-rows'>
                    <div style={{ flexBasis: "40%" }}>
                        <p>Delivery instructions:</p>
                    </div>
                    <div style={{ flexBasis: "60%" }}>
                        <InstructionsModal />
                    </div>
                </div>

            </div>
            <div className='order-summary'>
                <div className='book-delivery_header'>
                    <p>Order summary</p>
                </div>

                <div className='book-delivery_block'>

                    <div className='book-delivery-rows'>
                        <div style={{ flexBasis: "40%" }}>
                            <p>Basket total:</p>
                        </div>
                        <div style={{ flexBasis: "60%" }}>
                            <p>£{pay.basket.beforeDot + pay.basket.afterDot}</p>
                        </div>
                    </div>

                    <div className='book-delivery-rows'>
                        <div style={{ flexBasis: "40%" }}>
                            <p>Includes savings of:</p>
                        </div>
                        <div style={{ flexBasis: "60%" }}>
                            <p>£{pay.savings}</p>
                        </div>
                    </div>

                    <div className='book-delivery-rows'>
                        <div style={{ flexBasis: "40%" }}>
                            <p>Total coupon savings:</p>
                        </div>
                        <div style={{ flexBasis: "60%" }}>
                            <p>£{pay.coupons}</p>
                        </div>
                    </div>

                    <div className='book-delivery-rows'>
                        <div style={{ flexBasis: "40%" }}>
                            <h3>Total to pay</h3>
                        </div>
                        <div style={{ flexBasis: "60%" }}>
                            <h3>£{pay.total.beforeDot + pay.total.afterDot}</h3>
                        </div>
                    </div>

                </div>
            </div>
            <PayButton datePicked={value.display} />

        </React.Fragment>
    )


}


export default BookDelivery;

