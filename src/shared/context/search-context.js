import { createContext } from 'react';


export const SearchContext = createContext({
    products: [],
    productCode: '',
    findProducts: () => { }
});