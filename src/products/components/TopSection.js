import React from 'react';

import Basket from './Basket';
import CheckoutButton from './CheckoutButton'
import Search from './Search'

import './TopSection.css'

const TopSection = props => {


    return (
        <React.Fragment>
            <div className='top-section__div'>
                <div className='top-section__logo'>
                    <img className='brand-logo' src='/images/brand-logo/furuma.jpg' alt='brand logo' />
                </div>


                <div className='top-section__search-bar'>
                    <Search className='desktop-view' search={props.search} />
                </div>
                <div className='top-section__buttons'>
                    <div>
                        <Basket items={props.items} />
                    </div>
                    <div>
                        <CheckoutButton />
                    </div>

                </div>
            </div>
            <div className='top-section__hr'></div>
        </React.Fragment>




    )
};


export default TopSection;

