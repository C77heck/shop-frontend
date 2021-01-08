import React, { useContext, useEffect, useState } from 'react';

import ProductList from '../components/ProductList';
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import TopSection from '../components/TopSection'

import { AuthContext } from '../../shared/context/auth-context';
import { PurchaseContext } from '../../shared/context/purchase-context';


import './Shopping.css'




const Shopping = () => {

    const { isLoggedIn, favourites } = useContext(AuthContext);
    const { saveToLocalStorage, basketContent } = useContext(PurchaseContext);


    const [loadedProducts, setLoadedProducts] = useState([]);
    const { sendRequest, isLoading, error, clearError } = useHttpClient();


    useEffect(() => {
        (async () => {
            /* needs to condition it right so we hold onto the data.
            the key is when we change the localstorage data as we can easily reset it by default otherwise
            we hold onto all the data.. */
            if (isLoggedIn) {

                const responseData = await sendRequest(process.env.REACT_APP_BACKEND)
                const products = responseData.products.map(i => {

                    return {
                        ...i,
                        number: 0,
                        totalPrice: 0,
                        isFavourite: false
                    }
                })
                const favourites = JSON.parse(localStorage.getItem('userData'))
                setLoadedProducts(products.map(i => {
                    if (favourites.favourites.includes(i.id)) {
                        i.isFavourite = true;
                    }
                    return i;
                }))
            }



        })();
    }, [isLoggedIn])

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <div className='top-section'>
                <TopSection items={loadedProducts} />
            </div>
            {!isLoading && loadedProducts && <div className='shopping'>
                <ProductList items={loadedProducts} />
            </div>}



        </React.Fragment>
    )
}


export default Shopping;





