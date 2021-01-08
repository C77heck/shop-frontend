import { createContext } from 'react';


export const PurchaseContext = createContext({
    code: '',
    favouriteHandler: () => { },
    saveToLocalStorage: () => { },
    add: () => { },
    subtract: () => { },
    updateBasket: () => { },
    deleteItem: () => { },
    basket: {},
    basketContent: []
});