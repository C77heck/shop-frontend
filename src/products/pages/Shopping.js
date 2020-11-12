import React, { useEffect, useState } from 'react';

import ProductList from '../components/ProductList';
import { useHttpClient } from '../../shared/hooks/http-hook'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import TopSection from '../components/TopSection'

import './Shopping.css'
import { CSSTransition } from 'react-transition-group';


const Shopping = () => {
    const [loadedProducts, setLoadingProducts] = useState();
    const { sendRequest, isLoading, error, clearError } = useHttpClient();


    useEffect(() => {
        (async () => {
            try {
                const responseData = await sendRequest('http://localhost:2000/api/products')
                setLoadingProducts(responseData.products.map(i => ({ ...i, number: 0 })))
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


            {!isLoading && loadedProducts && <div className='shopping'><ProductList items={loadedProducts} /></div>}



        </React.Fragment>
    )
}


export default Shopping;