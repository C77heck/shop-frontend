import { useState, useCallback, useEffect } from 'react';



export const usePurchase = () => {
    const [code, setCode] = useState();
    const [basket, setBasket] = useState({
        price: '',
        amount: ''
    })
    const [basketContent, setBasketContent] = useState()
    const saveToLocalStorage = (array) => {
        localStorage.setItem(
            'basketContent',
            JSON.stringify({
                products: array
            })
        );
    }


    const updateBasket = (items) => {
        saveToLocalStorage(items)
        setBasket({
            price: items.reduce((a, i) => {
                return a + i.price * i.number
            }, 0),
            amount: items.reduce((a, i) => {
                return a + i.number
            }, 0)
        })
    }




    const add = useCallback(
        (items, code) => {
            setCode(code);
            items.map(i => {
                if (i.code === code) {
                    i.number += 1
                }
            })
            updateBasket(items)
        },
        [],
    )

    const deleteItem = useCallback(
        (items, code) => {
            setCode(code)
            items.map(i => {
                if (i.code === code) {
                    i.number -= i.number;
                }
            })
            updateBasket(items)
            getProducts()
        }, [])


    const subtract = useCallback(
        (items, code) => {
            setCode(code);
            items.map(i => {
                if (i.code === code) {
                    i.number -= 1
                }
            })
            updateBasket(items)
        }, [])

    const clearBasket = useCallback(
        (items) => {
            items.map(i => {
                i.number = 0;
            })
            updateBasket(items)
        }, [])

    const getProducts = () => {

        const products = (JSON.parse(localStorage.getItem('basketContent')).products)
        setBasketContent(products)
        return products;

    }

    return {
        code,
        saveToLocalStorage,
        add,
        subtract,
        basket,
        updateBasket,
        clearBasket,
        deleteItem,
        getProducts,
        basketContent
    }
}


