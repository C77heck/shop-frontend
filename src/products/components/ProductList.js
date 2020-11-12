import React from 'react';

import ProductCard from './ProductCard';

import './Products.css'

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
                      
                    />
                )
            })}
        </div>

    )

}

export default ProductList;