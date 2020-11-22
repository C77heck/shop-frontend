import { useState, useCallback } from 'react';



export const useSearch = () => {
    const [products, setProducts] = useState([]);
    const [productCode, setProductCode] = useState();


    const findProducts = useCallback(
        (products, productCode) => {
            /* need an if statement if its a number input or a letter one */
            setProductCode(productCode)
            console.log(productCode)
            console.log(products)
            setProducts(() => {
                return products.filter(product => product.id === productCode)
            })
        },
        [])
    return { products, productCode, findProducts }
}