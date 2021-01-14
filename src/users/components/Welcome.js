import React from 'react';

import Search from '../../products/components/Search';


import './Welcome.css';

const Welcome = props => {

    return (
        <React.Fragment>



            <div className='welcome-card__container'>
                <h1>Welcome to Furuma</h1>
                <h2>groceries online</h2>
                <h4>Food, drink and more to your door.</h4>

                <button className='btn-to-register'>ALREADY A CUSTOMER?</button>

                <button className='btn-to-shop'>
                    CHECK OUT OUR PRODUCTS</button>
            </div>


        </React.Fragment>
    )
}



export default Welcome;

