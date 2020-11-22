import React, { useEffect, useState } from 'react'

import { useHttpClient } from '../hooks/http-hook';
import Carousel from 'react-grid-carousel'
import CarouselIMG from './CarouselIMG';


import "react-responsive-carousel/lib/styles/carousel.min.css";
import './ProductSlider.css';


const ProductSlider = () => {

    const { sendRequest, isLoading } = useHttpClient();
    const [firstSlideImages, setFirstSlideImages] = useState();
    const [secondSlideImages, setSecondSlideImages] = useState();

    useEffect(() => {
        (async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND);
                setFirstSlideImages(responseData.products.slice(20, 28))
                setSecondSlideImages(responseData.products.slice(16, 24))
            } catch (err) {
                console.log(err)
            }
        })()
    }, [sendRequest])



    return (
        <div className='outer-div'>
            <div className='hr-product-slider'></div>

            <div className='carousel-container'>
                <Carousel loop>
                    <Carousel.Item>
                        <div className='product-slider__container'>{!isLoading && firstSlideImages && firstSlideImages.map(i => {
                            return <CarouselIMG key={i.id} code={i.code} image={i.image} name={i.name} className={"carousel-link"} />
                        }
                        )}</div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className='product-slider__container'>{!isLoading && secondSlideImages && secondSlideImages.map(i => {
                            return <CarouselIMG key={i.id} image={i.image} name={i.name} className={"carousel-link"} />
                        }
                        )}</div>
                    </Carousel.Item>
                </Carousel >

            </div>
            <div className='hr-product-slider'></div>

        </div>

    )
}



export default ProductSlider;
