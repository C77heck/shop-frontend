import { createContext } from 'react';


export const PurchaseContext = createContext({
    basketItems: [],
    code: '',
    number: 0,
    getNumber: () => { },
    add: () => { },
    subtract: () => { }
});