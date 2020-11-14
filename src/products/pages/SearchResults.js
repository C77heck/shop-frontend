import React, { useState, useEffect } from 'react';


import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import TopSection from '../../products/components/TopSection';
import ProductList from '../../products/components/ProductList';
import { useHttpClient } from '../../shared/hooks/http-hook';

const SearchResult = () => {

    const { isLoading } = useHttpClient();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (() => {
            try {
                const responseData = JSON.parse(localStorage.getItem('searchedItems'))
                setProducts(responseData.searches)
            } catch (err) {
                console.log(err)
            }
        })();
    }, [])


    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            <TopSection />
            <div className='shopping'><ProductList items={products} /></div>
        </React.Fragment>
    )

}


export default SearchResult;