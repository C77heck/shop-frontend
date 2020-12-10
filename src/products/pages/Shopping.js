import React, { useContext, useEffect, useState } from 'react';

import ProductList from '../components/ProductList';
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import TopSection from '../components/TopSection'

import './Shopping.css'
import { AuthContext } from '../../shared/context/auth-context';

const Shopping = () => {

    const { isLoggedIn } = useContext(AuthContext);

    const [loadedProducts, setLoadedProducts] = useState();
    const { sendRequest, isLoading, error, clearError } = useHttpClient();


    useEffect(() => {
        (async () => {
            try {
                if (!isLoggedIn) {
                    const responseData = await sendRequest(process.env.REACT_APP_BACKEND)
                    setLoadedProducts(responseData.products.map(i => ({
                        ...i,
                        number: 0,
                        totalPrice: 0
                    })))
                } else {
                    const storedData = (JSON.parse(localStorage.getItem('basketContent')))
                    setLoadedProducts(storedData.products)
                }

            } catch (err) {
            }
        })();
    }, [sendRequest, isLoggedIn])

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