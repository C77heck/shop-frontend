import { useState, useCallback, useEffect } from 'react';
import { useHttpClient } from './http-hook';



export const usePurchase = () => {
    const [code, setCode] = useState();
    const [basket, setBasket] = useState({
        price: '',
        amount: ''
    })

    const [basketContent, setBasketContent] = useState([])




    const saveToLocalStorage = (products, name) => {
        name = name || 'basketContent';
        setBasketContent(products)
        localStorage.setItem(
            `${name}`,
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

/*     const cancelItem= (products, id,)=>{
        saveToLocalStorage(products.map(i => {
            if (i.id === id) {
                
            }
            return i;
        }))
    }
 */
    const favouriteHandler = (products, id, isFavourite) => {
            saveToLocalStorage(products.map(i => {
                if (i.id === id) {
                    i.isFavourite = isFavourite;
                }
                return i;
            }))
        } 

        const deleteItem = useCallback(
            (products, code) => {
                setCode(code)
                products.map(i => {
                    if (i.code === code) {
                        i.number = i.number;
                    }
                })
                saveToLocalStorage(products)
            }, [])


    const add = useCallback(
        (products, code) => {
            setCode(code);
            products.map(i => {
                if (i.code === code) {
                    i.number += 1
                }
            })
            saveToLocalStorage(products)
        },
        [],
    )




    const subtract = useCallback(
        (products, code) => {
            setCode(code);
            products.map(i => {
                if (i.code === code) {
                    i.number -= 1
                }
            })
            saveToLocalStorage(products)
        }, [])

    const clearBasket = useCallback(
        (products) => {
            products.map(i => {
                i.number = 0;
            })
            saveToLocalStorage(products)
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


