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
                        src={process.env.REACT_APP_IMAGE_ROUTE + props.image}
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
                    <p >£{props.price}</p>
                    <BuyButton
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
        <div className=' grid-container'>
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