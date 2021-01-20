import React, { useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import Auth from '../../users/components/Auth';
import TopSection from '../../products/components/TopSection';

import './Welcome.css';
import { Link } from 'react-router-dom';
import { PurchaseContext } from '../../shared/context/purchase-context';

const Welcome = props => {

    const { isLoggedIn } = useContext(AuthContext);
    const { basketContent } = useContext(PurchaseContext);


    return (
        <React.Fragment>
            {!isLoggedIn ? <div className='welcome-card__container'>
                <h1>Welcome to Furuma</h1>
                <h2>groceries online</h2>
                <h4>Food, drink and more to your door.</h4>

                <Auth> <button className='btn-to-register'>ALREADY A CUSTOMER?</button></Auth>

                <Link to='/shopping'><button
                    className='btn-to-shop'
                >
                    CHECK OUT OUR PRODUCTS</button>
                </Link>
            </div>
                :
                <div className='top-section'>
                    <TopSection items={basketContent.products} />
                </div>
            }


        </React.Fragment>
    )
}



export default Welcome;

