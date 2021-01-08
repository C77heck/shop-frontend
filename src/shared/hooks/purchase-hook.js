import { useState, useCallback, useEffect } from 'react';



export const usePurchase = () => {
    const [code, setCode] = useState();
    const [basket, setBasket] = useState({
        price: '',
        amount: ''
    })
    const [basketContent, setBasketContent] = useState()

    const saveToLocalStorage = (products) => {
        localStorage.setItem(
            'basketContent',
            JSON.stringify({
                products: products
            })
        );
    }


    const favouriteHandler = (products, code, isFavourite) => {
        saveToLocalStorage(products.map(i => {
            if (i.id === code) {
                console.log('we hit if')
                i.isFavourite = isFavourite;
            }
            console.log('we did not hit if')

            return i;
        })
        )
        //updateBasket(products)

    }

    const updateBasket = (products) => {
        saveToLocalStorage(products)
        setBasket({
            price: products.reduce((a, i) => {
                return a + i.price * i.number
            }, 0),
            amount: products.reduce((a, i) => {
                return a + i.number
            }, 0)
        })
    }




    const add = useCallback(
        (products, code) => {
            setCode(code);
            products.map(i => {
                if (i.code === code) {
                    i.number += 1
                }
            })
            updateBasket(products)
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
            updateBasket(products)
            getProducts()
        }, [])


    const subtract = useCallback(
        (products, code) => {
            setCode(code);
            products.map(i => {
                if (i.code === code) {
                    i.number -= 1
                }
            })
            updateBasket(products)
        }, [])

    const clearBasket = useCallback(
        (products) => {
            products.map(i => {
                i.number = 0;
            })
            updateBasket(products)
        }, [])

    const getProducts = () => {

        const products = (JSON.parse(localStorage.getItem('basketContent')).products)
        setBasketContent(products)
        updateBasket(products)
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
        basketContent,
        favouriteHandler
    }
}


