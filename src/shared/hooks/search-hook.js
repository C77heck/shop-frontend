import { useState, useCallback } from 'react';



export const useSearch = () => {
    const [products, setProducts] = useState([]);
    const [productCode, setProductCode] = useState();


    const findProducts = useCallback(
        (products, productCode) => {
            setProductCode(productCode)
            setProducts(() => {
                return products.filter(product => product.id === productCode)
            })
        },
        [])
    return { products, productCode, findProducts }
}