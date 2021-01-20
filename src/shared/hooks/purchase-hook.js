import { useState, useCallback } from 'react';

export const usePurchase = () => {
    const [code, setCode] = useState();
    const [basket, setBasket] = useState({
        price: '',
        amount: ''
    })

    const [basketContent, setBasketContent] = useState({
        products: [],
        userId: ''
    })

    const saveToLocalStorage = (products, userId) => {
        userId = userId || '';
        setBasketContent({ products: products, userId: userId })
        localStorage.setItem(
            `basketContent`,
            JSON.stringify({
                products: products,
                userId: userId
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


    const favouriteHandler = (products, id, isFavourite, userId) => {
        saveToLocalStorage(products.map(i => {
            if (i.id === id) {
                i.isFavourite = isFavourite;
            }
            return i;
        }), userId)
    }

    const deleteItem = useCallback(
        (products, code, userId) => {
            setCode(code)
            saveToLocalStorage(products.map(i => {
                if (i.code === code) {
                    i.number = 0;
                }
                return i;
            }), userId)
        }, [])


    const add = useCallback(
        (products, code, userId) => {
            setCode(code);
            products.map(i => {
                if (i.code === code) {
                    i.number += 1
                }
                return null;
            })
            saveToLocalStorage(products, userId)
        },
        [],
    )




    const subtract = useCallback(
        (products, code, userId) => {
            setCode(code);
            products.map(i => {
                if (i.code === code) {
                    i.number -= 1
                }
                return null;
            })
            saveToLocalStorage(products, userId)
        }, [])

    const clearBasket = useCallback(
        (products, userId) => {
            products.map(i => {
                i.number = 0;
                return i;
            })
            saveToLocalStorage(products, userId)
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


