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
            try {

                if (!isLoggedIn) {

                    const products = JSON.parse(localStorage.getItem('display')).products
                    saveToLocalStorage(products, 'display')
                    setLoadedProducts(products)

                } else {
                    console.log('we are in43434')

                    const products = JSON.parse(localStorage.getItem('basketContent')).products

                    setLoadedProducts(products)
                    saveToLocalStorage(products)

                }
            } catch (err) {
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





