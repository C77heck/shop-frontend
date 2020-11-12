import React from 'react';


import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import TopSection from '../../products/components/TopSection';
import ProductList from '../../products/components/ProductList';
import { useHttpClient } from '../../shared/hooks/http-hook';

const SearchResult = () => {

    const { isLoading } = useHttpClient();

    let products = [];
    try {
        products = JSON.parse(localStorage.getItem('searchedItems'))
        products = products.searches;
        console.log(products)
    } catch (err) {
        console.log(err)
    }

    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            <TopSection />
            <div className='shopping'><ProductList items={products} /></div>
        </React.Fragment>
    )

}


export default SearchResult;