import React, { useEffect, useState } from 'react';

import ProductList from '../components/ProductList';
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import TopSection from '../components/TopSection'

import './Shopping.css'

const Shopping = () => {
    const [loadedProducts, setLoadedProducts] = useState();
    const { sendRequest, isLoading, error, clearError } = useHttpClient();

    useEffect(() => {

        (async () => {
            try {
                if (localStorage.getItem('basketContent') === null) {
                    const responseData = await sendRequest(process.env.REACT_APP_BACKEND)
                    setLoadedProducts(responseData.products.map(i => ({
                        ...i,
                        number: 0,
                        totalPrice: 0
                    })))
                } else {
                    const storageData = JSON.parse(localStorage.getItem('basketContent'))
                    setLoadedProducts(storageData.products)
                }
            } catch (err) {
            }
        })();
    }, [sendRequest])

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <div className='top-section'>
                <TopSection />
            </div>


            {!isLoading && loadedProducts && <div className='shopping'>
                <ProductList items={loadedProducts} />
            </div>}



        </React.Fragment>
    )
}


export default Shopping;