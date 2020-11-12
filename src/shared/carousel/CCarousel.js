import React from 'react';

import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import './CCarousel.css'


const CCarousel = () => {
    return (
        <div className='carousel-container__CCarousel'>
            <Carousel>
                <div>
                    <img
                        className="carousel-images d-block w-100"
                        src="/images/carousel/BBQ.jpg"
                        alt="First slide"
                    />
                </div>
                <div>
                    <img
                        className="carousel-images d-block w-100"
                        src="/images/carousel/berries.jpg"
                        alt="Second slide"
                    />
                </div>

                <div>

                    <img
                        className="carousel-images d-block w-100"
                        src="/images/carousel/hams.jpg"
                        alt="Third slide"
                    />
                </div>

                <div>

                    <img
                        className="carousel-images d-block w-100"
                        src="/images/carousel/vegies.jpg"
                        alt="Fourth slide"
                    />
                </div>
            </Carousel>
        </div>
    )
}


export default CCarousel;


