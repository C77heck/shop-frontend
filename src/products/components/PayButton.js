import React, { useContext, useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import { PurchaseContext } from '../../shared/context/purchase-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { usePurchase } from '../../shared/hooks/purchase-hook';
import ErrorModal from '../../shared/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';

import './PayButton.css'

const PayButton = props => {

    const auth = useContext(AuthContext)
    const { basket } = useContext(PurchaseContext)
    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    const { clearBasket } = usePurchase();
    const [products, setProducts] = useState([]);
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState()


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


    const payHandler = async () => {
        try {
            if (props.datePicked === '') {
                setErrorMessage('Please pick a delivery date for your order.')
            }
            const todaysDate = String(new Date()).slice(0, 15);
            await sendRequest(
                process.env.REACT_APP_ORDERS,
                'POST',
                JSON.stringify({
                    products: JSON.stringify(products),
                    dateOrdered: todaysDate,
                    dateToBeDelivered: props.datePicked,
                    totalPrice: basket.price,
                    numberOfItems: basket.amount,
                    creator: auth.userId
                }),
                {
                    Authorization: 'Bearer ' + auth.token,
                    'Content-Type': 'application/json'
                }
            )
            history.push('/thankyou')
            clearBasket(products);
        } catch (err) {
        }

    }

    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            <ErrorModal
                errorMessage={errorMessage}
                error={error}
                onClear={clearError}
                footerStyle={{ padding: "0 0.5rem 1rem" }}
            />
            <button
                className='pay-button'
                onClick={payHandler}
            >checkout</button>
        </React.Fragment>

    )
}


export default PayButton;