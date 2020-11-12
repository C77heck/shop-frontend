import { useState, useCallback } from 'react';


export const usePurchase = () => {
    const [items, setItems] = useState([])
    const [basketItems, setBasketItems] = useState([]);
    const [code, setCode] = useState();
    const [number, setNumber] = useState();

    const deleting = (array, code) => {
        const nonMatching = [];
        const matching = [];
        array.forEach(i => {
            if (i.code === code) {
                matching.push(i)
            } else {
                nonMatching.push(i)
            }
        })
        matching.pop()

        return [...nonMatching, ...matching]
    }



    const getNumber = (number) => {
        setNumber(number)

    }

    const add = useCallback(
        (items, code) => {
            setItems(items);
            setCode(code);
            let newItem = items.filter(i => i.code === code);

            setBasketItems(prev => {
                const popDuplicate = prev.filter(i => i.code !== code)
                return [...popDuplicate, ...newItem];
            })
        },
        [items, code],
    )



    const subtract = useCallback(
        (code) => {
            setCode(code);
            if (number === 1) {
                setBasketItems(prev => deleting(prev, code))
            }

        },
        [code],
    )
    return { basketItems, number, getNumber, code, add, subtract }
}





