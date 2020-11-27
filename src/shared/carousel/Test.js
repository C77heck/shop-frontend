
import React, { useState, useEffect } from 'react';

import { useHttpClient } from '../hooks/http-hook'

import Mapping from './Mapping';

import './Carousel.css';

const Test = props => {
    const { sendRequest } = useHttpClient()
    const [slideStyle, setSlideStyle] = useState();
    const [carousel, setCarousel] = useState({
        activeSlide: 0,
        translate: 0,
        transition: 8
    })
    
    const [pics, setPics] = useState({
        pics1: [],
        pics2: [],
        pics3: [],
        pics4: []
    })
    const { translate, activeSlide, slides, transition } = carousel;

    useEffect(() => {
        setSlideStyle({
            transform: `translateX(-${translate}%)`,
            transition: `transform 0.8s`
        })
    }, [translate, activeSlide])

    useEffect(() => {
        (async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND)
                setPics({
                    pics1: responseData.products.slice(1, 7),
                    pics2: responseData.products.slice(8, 15),
                    pics3: responseData.products.slice(16, 24),
                    pics4: responseData.products.slice(23, 31)
                })
            } catch (err) {
                console.log('failed to fetch')
            }
        })()
    }, [sendRequest])

    const arrowLeftHandler = () => {
        if (activeSlide !== 0) {
            setCarousel({
                ...carousel,
                translate: translate - 100,
                activeSlide: activeSlide - 1,
            })

        } else {
            //last slider option will jump over the the other end
            setCarousel({
                ...carousel,
                translate: translate + (100 * 3),
                activeSlide: 3,
            })
        }


    }

    const arrowRightHandler = () => {
        if (activeSlide !== 3) {
            console.log('left if block')
            setCarousel({
                ...carousel,
                translate: translate + 100,
                activeSlide: activeSlide + 1,

            })
        } else {
            //last slider option will jump over the the other end
            console.log('left else block')
            setCarousel({
                ...carousel,
                translate: 0,
                activeSlide: 0,

            })
        }
    }


    return (
        <div className='carouse-outer_div'>
            <div className='carousel-wrapper'>
                <div className='slider-divs' style={slideStyle}>
                    <Mapping
                        images={pics.pics1}
                    />
                </div>
                <div className='slider-divs' style={slideStyle}>
                    <Mapping
                        images={pics.pics2}
                    />
                </div>
                <div className='slider-divs' style={slideStyle}>
                    <Mapping
                        images={pics.pics3}
                    />
                </div>
                <div className='slider-divs' style={slideStyle}>
                    <Mapping
                        images={pics.pics4}
                    />
                </div>

            </div>
            <button
                className='left-side_controller'
                onClick={arrowLeftHandler}
            >
                <img src="/images/icons/left-arrow.svg" alt="left arrow" />
            </button>
            <button
                className='right-side_controller'
                onClick={arrowRightHandler}
            >
                <img src="/images/icons/right-arrow.svg" alt="right arrow" />
            </button>
        </div>
    )
}


export default Test;