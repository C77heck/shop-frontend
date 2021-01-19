import { createContext } from 'react';


export const SearchContext = createContext({
    searchCriteria: '',
    search: () => { }
});