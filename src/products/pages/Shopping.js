import React, { useContext, useEffect, useState } from 'react';

import ProductList from '../components/ProductList';
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import TopSection from '../components/TopSection'

import { AuthContext } from '../../shared/context/auth-context';
import { PurchaseContext } from '../../shared/context/purchase-context';

import { usePurchase } from '../../shared/hooks/purchase-hook';

import './Shopping.css'




const Shopping = () => {

    const { isLoggedIn } = useContext(AuthContext);
    const { code, basket, basketContent } = useContext(PurchaseContext);

    const { getProducts } = usePurchase()

    const [loadedProducts, setLoadedProducts] = useState([]);
    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    useEffect(() => {
        (async () => {
            try {

                if (!isLoggedIn) {
                    const responseData = await sendRequest(process.env.REACT_APP_BACKEND)
                    setLoadedProducts(responseData.products.map(i => ({
                        ...i,
                        number: 0,
                        totalPrice: 0,
                        isFavourite: false
                    })))
                } else {
                    setLoadedProducts(getProducts())
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