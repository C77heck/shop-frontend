import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { SearchContext } from '../../shared/context/search-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/UIElements/ErrorModal';

import './Search.css';

const Search = props => {

    const search = useContext(SearchContext)
    const history = useHistory();
    const { sendRequest, isLoading } = useHttpClient();
    const [content, setContent] = useState('');
    const [searchResults, setSearchResults] = useState()

    const okay = () => {
        setSearchResults(null)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!isNaN(content)) {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_SEARCH_ROUTE + content)//need to change the url we send the req to
                search.products = responseData.products
                if (search.products.length > 0) {
                    localStorage.setItem(
                        'searchedItems',
                        JSON.stringify({
                            searches: search.products
                        })
                    );
                    history.push('/')
                    history.push('/searchresults')
                } else {
                    setSearchResults('Sorry, no items matching your search criteria.')
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_SEARCH_ROUTE2 + content)
                search.products = responseData.products
                if (search.products.length > 0) {
                    localStorage.setItem(
                        'searchedItems',
                        JSON.stringify({
                            searches: search.products
                        }))
                    history.push('/')
                    history.push('/searchresults')
                } else {
                    setSearchResults('Sorry, no items matching your search criteria.')
                }
            } catch (err) {
                console.log(err)
            }
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
                                <img className="search-icon" name='search-button' src="/images/icons/magnifying-glass.svg" alt="basket" />
                            </div>
                            <div className='item2'>
                                <input type='text' className='search-bar' placeholder='find a product' name='search' value={content} onChange={inputHandler} />
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