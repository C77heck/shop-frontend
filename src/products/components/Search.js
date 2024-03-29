import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { SearchContext } from '../../shared/context/search-context';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/UIElements/ErrorModal';

import './Search.css';
import { PurchaseContext } from '../../shared/context/purchase-context';
import { AuthContext } from '../../shared/context/auth-context';

const Search = props => {
    const { userId } = useContext(AuthContext);
    const history = useHistory();
    const { basketContent } = useContext(PurchaseContext);
    const [searchCriteria, setSearchCriteria] = useState('');
    const [searchResults, setSearchResults] = useState()

    const { search } = useContext(SearchContext)

    const [isLoading, setIsLoading] = useState(false)

    const okay = () => {
        setSearchResults(null)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const count = search(basketContent.products, searchCriteria, userId)

        if (count > 0) {
            setIsLoading(false)
            history.push('/searchresults')
        } else {
            setIsLoading(false)
            setSearchResults('Sorry, no items matching your search criteria.')
        }
    }


    const inputHandler = (e) => {
        setSearchCriteria(e.target.value)
    }


    return (
        <React.Fragment>
            <div className={`${props.className}`}>
                <ErrorModal error={searchResults} onClear={okay} />
                {isLoading && <LoadingSpinner asOverlay />}
                <form onSubmit={submitHandler}>
                    <div className='border-container'>

                        <div className='search_grid-container'>

                            <div className='item1'>
                                <img
                                    className="search-icon"
                                    name='search-button'
                                    src="/images/icons/magnifying-glass.svg"
                                    alt="search icon"
                                />
                            </div>
                            <div className='item2'>
                                <input
                                    type='text'
                                    className='search-bar'
                                    placeholder='find a product'
                                    name='search'
                                    value={searchCriteria}
                                    onChange={inputHandler}
                                />
                            </div>
                            <div className='item3'>
                                <button className='search-button'>Go</button>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </React.Fragment>
    )
}

export default Search;
