import React from 'react';

import BuyButton from './BuyButton'

import './Products.css'



const ProductCard = props => {
    return (


        <div className='productsCont grid-item'>
            <div className='inner-product-container'>
                <div className="picDiv">
                    <img
                        className='productImg'
                        src={`http://localhost:2000/${props.image}`}
                        alt={props.name}
                    />
                </div>
                <div className='product-name'>
                    <p >{props.name}</p>
                </div>
                <p className='productCode'>{props.code}</p>
                <hr className="hrProduct" />

                <div className="bottomProduct">
                    <p className="unit">{props.unit}</p>
                    <p>£{props.price}</p>

                    <BuyButton items={props.items} code={props.code} price={props.price} />


                </div>

            </div>
        </div>

    )

}


export default ProductCard;

