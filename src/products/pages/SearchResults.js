import React, { useContext } from 'react';


import TopSection from '../../products/components/TopSection';
import ProductList from '../../products/components/ProductList';
import { PurchaseContext } from '../../shared/context/purchase-context';


const SearchResult = () => {

    const { basketContent } = useContext(PurchaseContext)



    return (
        <React.Fragment>
            <TopSection items={basketContent} />
            <div className='shopping'>
                <ProductList items={basketContent} display='search' />
            </div>

        </React.Fragment>
    )

}


export default SearchResult;