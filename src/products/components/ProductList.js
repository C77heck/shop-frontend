import React from 'react';

import BuyButton from './BuyButton'


import './Products.css'


const ProductCard = props => {

    return (


        <div className='grid-item'>
            <div className='inner-product-container'>
                <div className="image-container__products">
                    <img
                        className='product-image'
                        src={process.env.REACT_APP_IMAGE_ROUTE + props.image}
                        alt={props.name}
                    />
                </div>
                <div className='product-name'>
                    <p >{props.name}</p>
                </div>
                <p className='product-code'>{props.code}</p>
                <hr className="horizontal-line" />

                <div className="bottom-product__container">
                    <p className="unit">{props.unit}</p>
                    <p >£{props.price}</p>
                    <BuyButton
                        id={props.id}
                        items={props.items}
                        code={props.code}
                        price={props.price}
                        number={props.number}
                    />

                </div>

            </div>
        </div>

    )

}

const ProductList = props => {


    return (
        <div className='grid-container'>
            {props.items.map((product) => {

                return (

                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        unit={product.unit}
                        price={product.price}
                        image={product.image}
                        code={product.code}
                        items={props.items}
                        number={product.number}

                    />
                )
            })}
        </div>

    )

}

export default ProductList;