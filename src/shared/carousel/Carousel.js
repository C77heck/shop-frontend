
import React, { useState, useEffect, useContext } from 'react';

import { useHttpClient } from '../hooks/http-hook'

import Mapping from './Mapping';

import './Carousel.css';

import './ProductCarousel.css'
import { PurchaseContext } from '../context/purchase-context';
import { AuthContext } from '../context/auth-context';
import LoadingSpinner from '../UIElements/LoadingSpinner';


const images = [
    {
        alt: "shop image",
        src: "/images/carousel/shop1.jpg",
        id: 0
    },
    {
        alt: "shop image",
        src: "/images/carousel/shop2.jpg",
        id: 1
    },
    {
        alt: "shop image",
        src: "/images/carousel/shop3.jpg",
        id: 2
    },
    {
        alt: "cake image",
        src: "/images/carousel/cakes.jpg",
        id: 3
    }
]


const Carousel = props => {

    const { saveToLocalStorage, basketContent } = useContext(PurchaseContext)

    const { isLoggedIn } = useContext(AuthContext)

    const { sendRequest, isLoading } = useHttpClient()
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
    const { translate, activeSlide } = carousel;
    const animationType = (props.animation === 'special'
        ? 'cubic-bezier(0.36, 0, 0.66, -0.56)'
        :
        '')
    useEffect(() => {
        setSlideStyle({
            transform: `translateX(-${translate}%)`,
            transition: `transform 1s ${animationType}`
        })
    }, [translate, activeSlide, animationType])

    useEffect(() => {


        if (basketContent.products.length > 0) {
            setPics({
                pics1: basketContent.products.slice(1, 7),
                pics2: basketContent.products.slice(8, 15),
                pics3: basketContent.products.slice(16, 24),
                pics4: basketContent.products.slice(23, 31)
            })
        } else {
            (async () => {
                try {
                    const responseData = await sendRequest(process.env.REACT_APP_BACKEND)
                    setPics({
                        pics1: responseData.products.slice(1, 7),
                        pics2: responseData.products.slice(8, 15),
                        pics3: responseData.products.slice(16, 24),
                        pics4: responseData.products.slice(23, 31)
                    })
                    saveToLocalStorage(responseData.products.map(i => ({
                        ...i,
                        number: 0,
                        totalPrice: 0,
                        dateFetched: new Date(),
                        isFavourite: false,
                        isSearched: false
                    })))
                } catch (err) {
                }
            })();

        }


    }, [sendRequest, basketContent, isLoggedIn, saveToLocalStorage])




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
            setCarousel({
                ...carousel,
                translate: translate + 100,
                activeSlide: activeSlide + 1,

            })
        } else {
            //last slider option will jump over the the other end
            setCarousel({
                ...carousel,
                translate: 0,
                activeSlide: 0,

            })
        }
    }

    return (
        <div
            className={`carouse-outer_div${props.className}`}
        >
            {isLoading && <LoadingSpinner asOverlay />}
            <div

                className={`carousel-wrapper${props.className}`}
            >
                {props.element === 'img' ? images.map((i) => {
                    return (
                        <img
                            onTouchMove={e => { arrowRightHandler() }}
                            key={i.id}
                            className={`carousel-images`}
                            style={slideStyle}
                            src={i.src}
                            alt={i.name}
                        />
                    )
                })
                    :
                    <React.Fragment>
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
                    </React.Fragment>
                }

            </div>
            <button
                className={`left-side_controller${props.className}`}
                onClick={arrowLeftHandler}
            >
                <img src="/images/icons/left-arrow.svg" alt="left arrow" />
            </button>
            <button
                className={`right-side_controller${props.className}`}
                onClick={arrowRightHandler}
            >
                <img src="/images/icons/right-arrow.svg" alt="right arrow" />
            </button>
        </div>
    )
}


export default Carousel;

