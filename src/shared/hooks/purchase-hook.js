import { useState, useCallback, useEffect } from 'react';
import { useHttpClient } from './http-hook';



export const usePurchase = () => {
    const [code, setCode] = useState();
    const [basket, setBasket] = useState({
        price: '',
        amount: ''
    })

    const [basketContent, setBasketContent] = useState({
        content: [],
        isLoggedIn: false
    })



    const saveToLocalStorage = (products, isLoggedIn) => {
        console.log('save to local storage', isLoggedIn)
        setBasketContent({
            content: products,
            isLoggedIn: isLoggedIn
        })
        localStorage.setItem(
            'basketContent',
            JSON.stringify({
                products: products,
                isLoggedIn: isLoggedIn
            })
        );

        setBasket({
            price: products.reduce((a, i) => {
                return a + i.price * i.number
            }, 0),
            amount: products.reduce((a, i) => {
                return a + i.number
            }, 0)
        })
    }


    const favouriteHandler = (products, code, isFavourite) => {
        saveToLocalStorage(products.map(i => {
            if (i.id === code) {
                i.isFavourite = isFavourite;
            }
            return i;
        })
            , true)
    }




    const add = useCallback(
        (products, code) => {
            setCode(code);
            products.map(i => {
                if (i.code === code) {
                    i.number += 1
                }
            })
            saveToLocalStorage(products, true)
        },
        [],
    )

    const deleteItem = useCallback(
        (products, code) => {
            setCode(code)
            products.map(i => {
                if (i.code === code) {
                    i.number -= i.number;
                }
            })
            saveToLocalStorage(products, true)
        }, [])


    const subtract = useCallback(
        (products, code) => {
            setCode(code);
            products.map(i => {
                if (i.code === code) {
                    i.number -= 1
                }
            })
            saveToLocalStorage(products, true)
        }, [])

    const clearBasket = useCallback(
        (products) => {
            products.map(i => {
                i.number = 0;
            })
            saveToLocalStorage(products, true)
        }, [])



    return {
        code,
        saveToLocalStorage,
        add,
        subtract,
        basket,
        clearBasket,
        deleteItem,
        basketContent,
        favouriteHandler
    }
}


