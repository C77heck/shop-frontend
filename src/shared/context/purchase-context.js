import { createContext } from 'react';


export const PurchaseContext = createContext({
    code: '',
    favouriteHandler: () => { },
    saveToLocalStorage: () => { },
    clearBasket: () => { },
    add: () => { },
    subtract: () => { },
    deleteItem: () => { },
    basket: {},
    basketContent: {
        content: [],
        isLoggedIn: true
    }
});