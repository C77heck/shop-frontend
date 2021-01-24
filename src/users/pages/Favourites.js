import React, { useContext, useEffect, useState } from 'react';
import ProductList from '../../products/components/ProductList';
import { PurchaseContext } from '../../shared/context/purchase-context';

import TopSection from '../../products/components/TopSection';

import './Favourites.css'

const Favourites = () => {

    const { basketContent } = useContext(PurchaseContext)

    const [products, setProducts] = useState([])

    const [itemCounter, setItemCounter] = useState(0)// if there isn't any favourite item we set the height so footer stays in place.


    useEffect(() => {
        if (basketContent.products.length < 1) {
            const products = JSON.parse(localStorage.getItem('basketContent')).products;
            products.map(i => {
                if (i.isFavourite) {

                    setItemCounter(prev => prev += 1)
                }
                return null;
            })
            setProducts(products)
        } else {
            basketContent.products.map(i => {
                if (i.isFavourite) {

                    setItemCounter(prev => prev += 1)
                }
                return null;
            })
            setProducts(basketContent.products)
        }
    }, [basketContent.products, setItemCounter])


    return (<div
        style={{ marginBottom: itemCounter > 0 ? '12vh' : 0 }}
    >
        <div
            style={{ marginBottom: itemCounter > 0 ? '2vh' : 0 }}
            className='top-section'>
            <TopSection items={products} />
        </div>
        {itemCounter > 0 ? <ProductList items={products} display={'favourites'} />
            :
            <div><h1
                className='no-favourites__yet'
            >No favourites has been added yet.</h1></div>}

    </div>)
}


export default Favourites;