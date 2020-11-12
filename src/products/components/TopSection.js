import React from 'react';

import Basket from './Basket';
import CheckoutButton from './CheckoutButton'
import Search from './Search'

import './TopSection.css'

const TopSection = props => {

    return (
        <React.Fragment>

            <img className='brand-logo' src='/images/brand-logo/furuma.jpg' alt='brand logo' />
            <div className='top-section__div'>

                <div className='buying-upper_strip'>
                    <CheckoutButton />
                </div>
                <div className='buying-mid_strip'>
                    <Search className='desktop-view' search={props.search} />
                </div>
                <div className='buying-lower_strip'>
                    <Basket />
                </div>
            </div>
            <div className='top-section__hr'></div>
        </React.Fragment>




    )
};


export default TopSection;


