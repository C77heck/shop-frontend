import React, { useContext, useEffect, useState } from 'react';

import ProductList from '../components/ProductList';
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import TopSection from '../components/TopSection'

import './Shopping.css'
import { PurchaseContext } from '../../shared/context/purchase-context';
import { AuthContext } from '../../shared/context/auth-context';

const Shopping = () => {

    const { isLoggedIn } = useContext(AuthContext);
    const { basketContent } = useContext(PurchaseContext)
    // const { basketContent } = usePurchase()
    const [loadedProducts, setLoadedProducts] = useState();
    const { sendRequest, isLoading, error, clearError } = useHttpClient();
    console.table(basketContent , isLoggedIn)


    useEffect(() => {
        (async () => {
            console.log('hitting the useEffect')
            try {
                if (!isLoggedIn) {
                    const responseData = await sendRequest(process.env.REACT_APP_BACKEND)
                    setLoadedProducts(responseData.products.map(i => ({
                        ...i,
                        number: 0,
                        totalPrice: 0
                    })))
                } else {
                    setLoadedProducts(basketContent)

                }

            } catch (err) {
            }
        })();
    }, [sendRequest, isLoggedIn, basketContent])

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