import React, { useContext, useEffect, useState } from 'react';
import ProductList from '../../products/components/ProductList';
import { AuthContext } from '../../shared/context/auth-context';
import { PurchaseContext } from '../../shared/context/purchase-context';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Favourites = () => {

    const { basketContent } = useContext(PurchaseContext)

    const [products, setProducts] = useState([])

    useEffect(() => {
        const favouriteProducts = [];
        basketContent.map(i => {
            if (i.isFavourite) {
                favouriteProducts.push(i)
            }
            setProducts(favouriteProducts)
            return i;
        })
    }, [basketContent])

    return (<div>
        <ProductList items={products} />
    </div>)
}


export default Favourites;