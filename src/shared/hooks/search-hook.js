import { useState, useCallback } from 'react';



export const useSearch = () => {
    const [products, setProducts] = useState([]);



    return { products }
}