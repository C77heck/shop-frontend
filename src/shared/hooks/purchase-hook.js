import { useState, useCallback } from 'react';



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
                products: array.map(i => ({
                    ...i,
                    totalPrice: i.number * i.price
                }))
            })
        );
        setBasketContent(JSON.parse(localStorage.getItem('basketContent')))
    }


    const updateBasket = (items) => {
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
            saveToLocalStorage(items)
            updateBasket(items)
        },
        [],
    )



    const subtract = useCallback(
        (items, code) => {
            setCode(code);
            items.map(i => {
                if (i.code === code) {
                    i.number -= 1
                }
            })
            saveToLocalStorage(items)
            updateBasket(items)
        }, [])



    return {
        code,
        saveToLocalStorage,
        add,
        subtract,
        basket,
        updateBasket,
        basketContent
    }
}





