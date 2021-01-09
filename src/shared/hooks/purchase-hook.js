import { useState, useCallback, useEffect } from 'react';
import { useHttpClient } from './http-hook';



export const usePurchase = () => {
    const [code, setCode] = useState();
    const [basket, setBasket] = useState({
        price: '',
        amount: ''
    })

    const [basketContent, setBasketContent] = useState([])

    useEffect(() => {
        const basket = JSON.parse(localStorage.getItem('basketContent')).products
        saveToLocalStorage(basket)
    }, [])
    /*     useEffect(() => {
            console.log(basketContent)
            if (basketContent.length > 0) {
                console.log('we hit the useEffect')
    
                localStorage
                    .setItem('basketContent', JSON.stringify({ products: basketContent }))
            }
        }, [basketContent]) */


    const saveToLocalStorage = (products) => {
        setBasketContent(products)
        localStorage.setItem(
            'basketContent',
            JSON.stringify({
                products: products,
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
        }))
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


