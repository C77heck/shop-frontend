import { useState, useCallback, useContext } from 'react';
import { PurchaseContext } from '../context/purchase-context';



export const useSearch = () => {
    const [searchCriteria, setSearchCriteria] = useState('')

    const { saveToLocalStorage } = useContext(PurchaseContext);

    const search = useCallback(
        (products, searchCriteria, userId) => {
            setSearchCriteria(searchCriteria)
            const regexp = new RegExp(`${searchCriteria}`, "i")
            let count = 0;
            saveToLocalStorage(products.map(i => {
                if (i.code === Number(searchCriteria) || i.name.match(regexp)) {
                    count += 1;
                    i.isSearched = true;
                } else {
                    i.isSearched = false;
                }
                return i;
            }), userId)
            return count;
        }, [saveToLocalStorage])


    return { search, searchCriteria }
}