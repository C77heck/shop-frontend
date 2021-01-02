import React, { useContext, useEffect, useState } from 'react';



import CheckoutList from '../../products/components/CheckoutList';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { BasketModal } from '../../products/components/Basket';
import Button from '../../shared/UIElements/Button';

import './PlacedOrders.css'
import { useHistory } from 'react-router-dom';
import { PurchaseContext } from '../../shared/context/purchase-context';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';

const ViewItems = props => {

    const [show, setShow] = useState(false);


    const products = JSON.parse(props.products)

    const onClickHandler = () => {
        setShow(true)
    }
    const onClearHandler = () => {
        setShow(false)
    }

    return (
        <React.Fragment>
            <BasketModal
                onClear={onClearHandler}
                show={show}
            >
                <CheckoutList
                    items={products}
                    noShow={true}
                />
            </BasketModal>
            <Button
                onClick={onClickHandler}
            >View items</Button>
        </React.Fragment>
    )
}

const ReOrder = props => {
    const history = useHistory()
    const purchase = useContext(PurchaseContext)
    const products = JSON.parse(props.products)

    const onClickHandler = () => {
        purchase.updateBasket(products)
        history.push('/checkout')
    }

    return (
        <Button
            onClick={onClickHandler}
        >Re-order</Button>

    )
}

const OrderCards = props => {

    const {
        dateOrdered,
        dateToBeDelivered,
        totalPrice,
        numberOfItems,
        products
    } = props.order;
    const [items, setItems] = useState([])





    return (
        <div className='order-cards__container'>
            <div className='order-cards__id'><p>order id: {props.id}</p></div>
            <div className='order-cards__details'>
                <div>
                    <p>Ordered on:</p>
                    <p>Delivery on:</p>
                    <p>Total value:</p>
                    <p>No. of items:</p>
                    <p>Order status:</p>
                </div>
                <div>
                    <p>{dateOrdered}</p>
                    <p>{dateToBeDelivered}</p>
                    <p>£{totalPrice}</p>
                    <p>{numberOfItems}</p>
                    <p>picked</p>
                </div>
            </div>
            <div className='order-cards__buttons'>
                <ViewItems products={products} />
                <ReOrder products={products} />
            </div>
        </div>
    )
}

const PlacedOrders = () => {
    const auth = useContext(AuthContext)
    const { sendRequest, isLoading } = useHttpClient()
    const [orders, setOrders] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_ORDERS + auth.userId
                )
                setOrders(responseData.orders)
            } catch (err) {

            }
        })()
    }, [])


    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            <div className='placed-orders__container'>
                {
                    orders.map(i => {
                        return <OrderCards
                            key={i._id}
                            id={i._id}
                            order={i}
                        />
                    })
                }

            </div>
        </React.Fragment>
    )
}


export default PlacedOrders;