import React, { useContext, useEffect, useState } from 'react';

import ProductList from '../components/ProductList';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import TopSection from '../components/TopSection'

import { AuthContext } from '../../shared/context/auth-context';
import { PurchaseContext } from '../../shared/context/purchase-context';

import './Shopping.css'

const Shopping = () => {

    const { isLoggedIn } = useContext(AuthContext);
    const { basketContent } = useContext(PurchaseContext);
    const [loadedProducts, setLoadedProducts] = useState([]);

    const [isLoading, setIsLoading] = useState(true)



    useEffect(() => {
        if (basketContent.products.length > 0) {
            try {

                setLoadedProducts(basketContent.products)
                setIsLoading(false)
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const products = JSON.parse(localStorage.getItem('basketContent'))
                setLoadedProducts(products.products)
                setIsLoading(false)
            } catch (err) {
                console.log(err)
            }
        }

    }, [isLoggedIn])


    return (
        <React.Fragment>
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





