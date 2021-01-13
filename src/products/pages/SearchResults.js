import React, { useState, useEffect, useContext } from 'react';


import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import TopSection from '../../products/components/TopSection';
import ProductList from '../../products/components/ProductList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { SearchContext } from '../../shared/context/search-context';

const SearchResult = () => {

    const { products } = useContext(SearchContext)
    const { isLoading } = useHttpClient();

    return (
        <React.Fragment>
            {isLoading && <LoadingSpinner asOverlay />}
            <TopSection />
            <div className='shopping'><ProductList items={products} /></div>
        </React.Fragment>
    )

}


export default SearchResult;