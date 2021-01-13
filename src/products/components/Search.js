import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { SearchContext } from '../../shared/context/search-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/UIElements/ErrorModal';

import './Search.css';
import { PurchaseContext } from '../../shared/context/purchase-context';

const Search = props => {

    const history = useHistory();
    const search = useContext(SearchContext);
    const { basketContent } = useContext(PurchaseContext);
    const { isLoading } = useHttpClient();
    const [content, setContent] = useState('');
    const [searchResults, setSearchResults] = useState()

    const okay = () => {
        setSearchResults(null)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const results = [];
        let regexp = new RegExp(`${content}`, "i")
        console.log(regexp)
        basketContent.map(i => {
            if (i.code === Number(content) || i.name.match(regexp)) {
                results.push(i);
            }
            return i;
        })

          if (results.length > 0) {
                  search.products = results;
                  history.push('/searchresults')
              } else {
                  setSearchResults('Sorry, no items matching your search criteria.')
              } 
    }

    const inputHandler = (e) => {
        setContent(e.target.value)
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
                                    value={content}
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
