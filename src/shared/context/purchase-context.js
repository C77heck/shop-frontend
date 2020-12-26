import { createContext } from 'react';


export const PurchaseContext = createContext({
    code: '',
    saveToLocalStorage: () => { },
    add: () => { },
    subtract: () => { },
    updateBasket: () => { },
    deleteItem: () => { },
    basket: {},
    basketContent: []
});