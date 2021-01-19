import React, { useContext } from 'react';


import TopSection from '../../products/components/TopSection';
import ProductList from '../../products/components/ProductList';
import { PurchaseContext } from '../../shared/context/purchase-context';


const SearchResult = () => {

    const { basketContent } = useContext(PurchaseContext)



    return (
        <React.Fragment>
            <TopSection items={basketContent.products} />
            <div className='shopping'>
                <ProductList items={basketContent.products} display='search' />
            </div>

        </React.Fragment>
    )

}


export default SearchResult;