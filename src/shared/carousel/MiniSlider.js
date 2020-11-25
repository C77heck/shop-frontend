import React, { useEffect, useState } from 'react';

import Carousel from './Carousel';

import { useHttpClient } from '../hooks/http-hook';

const ProductSlider = () => {
/*  const [firstSlideImages, setFirstSlideImages] = useState();
const [secondSlideImages, setSecondSlideImages] = useState();
const [thirdSlideImages, setThirdSlideImages] = useState();  */

    const [slides, setSlides] = useState([])

    const { sendRequest } = useHttpClient();

    useEffect(() => {
        (async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND);
                setSlides(
                    responseData.products.slice(20, 28),
                    responseData.products.slice(16, 24),
                    responseData.products.slice(5, 13)
                )
                console.log(slides)

            } catch (err) {
                console.log(err)
            }
        })()

    }, [sendRequest])
    return (
        <Carousel
            slides={slides}
            element='productSlider'
            className='product-slider__new'
        />
    )
}



export default ProductSlider;