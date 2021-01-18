import React from 'react';

import BuyButton from './BuyButton'
import FavouriteIcon from './FavouriteIcon';


import './Products.css'


const ProductCard = props => {


    const display = () => {
        if (props.display === 'favourites') {
            return !props.isFavourite ? 'none' : 'block';
        } else if (props.display === 'search') {
            return !props.isSearched ? 'none' : 'block';
        } else {
            return 'block'
        }
    }

    return (

        <div
            style={{ display: display() }}
            className='grid-item'
        >
            <div className='inner-product-container'>
                <FavouriteIcon
                    className='favourite-icon__product-card'
                    id={props.id}
                    isFavourite={props.isFavourite}
                    products={props.products}
                />
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
                        className='product-list__buy-button'
                        id={props.id}
                        items={props.products}
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
                        isFavourite={product.isFavourite}
                        isSearched={product.isSearched}
                        name={product.name}
                        unit={product.unit}
                        price={product.price}
                        image={product.image}
                        code={product.code}
                        products={props.items}
                        number={product.number}
                        display={props.display}

                    />
                )
            })}
        </div>

    )

}

export default ProductList;