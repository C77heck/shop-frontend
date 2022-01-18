
import React, { useState, useEffect, useContext } from 'react';

import { useHttpClient } from '../hooks/http-hook'

import Mapping from './Mapping';

import './Carousel.css';

import './ProductCarousel.css'
import { PurchaseContext } from '../context/purchase-context';
import { AuthContext } from '../context/auth-context';
import LoadingSpinner from '../UIElements/LoadingSpinner';




const Carousel = props => {

    const { saveToLocalStorage, basketContent } = useContext(PurchaseContext)

    const { isLoggedIn } = useContext(AuthContext)

    const { sendRequest, isLoading } = useHttpClient()
    const [slideStyle, setSlideStyle] = useState();
    const [carousel, setCarousel] = useState({
        activeSlide: 1,
        translate: 0,
        transition: 8
    })

    const [pics, setPics] = useState({
        pics1: [],
        pics2: [],
        pics3: [],
        pics4: [],
        pics5: []
    })

    const [dragStart, setDragStart] = useState();


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


    const [images, setImages] = useState([]);

    useEffect(() => {
        let carouselImages = [];
        let expiry = 0;
        if (localStorage.getItem('carouselImages')) {
            carouselImages = JSON.parse(localStorage.getItem('carouselImages')).images || [];
            expiry = JSON.parse(localStorage.getItem('carouselImages')).expiry;
        }
        if (carouselImages.length > 0
            &&
            expiry - new Date().getTime() > 0) {
            setImages(carouselImages);
        } else {
            (async () => {
                try {
                    const responseData = await sendRequest(
                        process.env.REACT_APP_RESOURCE_ROUTE + 'carousel');
                    setImages(responseData.images);
                    localStorage.setItem('carouselImages', JSON.stringify({
                        images: responseData.images,
                        expiry: new Date().getTime() + 1000 * 60 * 60 * 24 * 30 //1 month expiry
                    }));
                } catch (err) {
                }
            })()
        }

    }, [])

    useEffect(() => {
        if (basketContent.products.length > 0
            &&
            basketContent.products[0].dateFetched - new Date().getTime() > 0) {

            setPics({
                pics1: basketContent.products.slice(1, 7),
                pics2: basketContent.products.slice(8, 15),
                pics3: basketContent.products.slice(16, 24),
                pics4: basketContent.products.slice(23, 31)
            })
        } else {

            if (localStorage.getItem('basketContent')) {
                const products = JSON.parse(localStorage.getItem('basketContent')).products;
                setPics({
                    pics1: products.slice(1, 7),
                    pics2: products.slice(8, 15),
                    pics3: products.slice(16, 24),
                    pics4: products.slice(23, 31)
                })
            } else {
                (async () => {
                    try {

                        const responseData = await sendRequest(process.env.REACT_APP_BACKEND)
                        setPics({
                            pics1: responseData.products.slice(1, 7),
                            pics2: responseData.products.slice(8, 15),
                            pics3: responseData.products.slice(16, 24),
                            pics4: responseData.products.slice(23, 31),
                            pics5: responseData.products.slice(1, 7)
                        })
                        saveToLocalStorage(responseData.products.map(i => ({
                            ...i,
                            number: 0,
                            totalPrice: 0,
                            dateFetched: new Date().getTime() + 1000 * 60 * 60 * 24,
                            isFavourite: false,
                            isSearched: false
                        })))
                    } catch (err) {
                    }
                })();
            }

        }


    }, [])


    const arrowLeftHandler = () => {
        if (activeSlide !== 1) {
            setCarousel({
                ...carousel,
                translate: translate - 100,
                activeSlide: activeSlide - 1,
            })
        }
    }

    const arrowRightHandler = () => {
        if (activeSlide !== images.length + 1) {
            setCarousel({
                ...carousel,
                translate: translate + 100,
                activeSlide: activeSlide + 1,
            })
        }
    }


    const onTouchHandler = e => { //swipe controller
        if (dragStart > e.changedTouches[0].screenX) {
            arrowRightHandler()
        } else {
            arrowLeftHandler()
        }
    }

    const onDragHandler = e => { //mouse drag controller
        if (dragStart > e.clientX) {
            arrowRightHandler()
        } else {
            arrowLeftHandler()
        }
    }

    return (
        <div
            className={`carouse-outer_div${props.className} cursor-pointer`}
        >
            {isLoading && <LoadingSpinner asOverlay />}
            <div

                className={`carousel-wrapper${props.className}`}
            >

                {props.element === 'img' ? <React.Fragment>
                    <img
                        onTouchStart={e => { setDragStart(e.changedTouches[0].screenX) }}
                        onTouchEnd={onTouchHandler}
                        onDragStart={e => { setDragStart(e.clientX) }}
                        onDragEnd={onDragHandler}
                        key={1}
                        className={`carousel-images`}
                        style={slideStyle}
                        src='/images/carousel/startingImage.jpeg'
                        alt='cereal shelf'
                    />
                    {images.map((i) => {
                        return (
                            <img
                                onTouchStart={e => { setDragStart(e.changedTouches[0].screenX) }}
                                onTouchEnd={onTouchHandler}
                                onDragStart={e => { setDragStart(e.clientX) }}
                                onDragEnd={onDragHandler}
                                key={i._id}
                                className={`carousel-images`}
                                style={slideStyle}
                                src={process.env.REACT_APP_IMAGE_ROUTE + i.image}
                                alt={i.name}
                            />
                        )
                    })}</React.Fragment>
                    :
                    <React.Fragment>
                        <div
                            onTouchStart={e => { setDragStart(e.changedTouches[0].screenX) }}
                            onTouchEnd={onTouchHandler}
                            onDragStart={e => { setDragStart(e.clientX) }}
                            onDragEnd={onDragHandler}
                            className='slider-divs'
                            style={slideStyle}>
                            <Mapping
                                images={pics.pics1}
                            />
                        </div>
                        <div
                            onTouchStart={e => { setDragStart(e.changedTouches[0].screenX) }}
                            onTouchEnd={onTouchHandler}
                            onDragStart={e => { setDragStart(e.clientX) }}
                            onDragEnd={onDragHandler}
                            className='slider-divs'
                            style={slideStyle}>
                            <Mapping
                                images={pics.pics2}
                            />
                        </div>
                        <div
                            onTouchStart={e => { setDragStart(e.changedTouches[0].screenX) }}
                            onTouchEnd={onTouchHandler}
                            onDragStart={e => { setDragStart(e.clientX) }}
                            onDragEnd={onDragHandler}
                            className='slider-divs'
                            style={slideStyle}>
                            <Mapping
                                images={pics.pics3}
                            />
                        </div>
                        <div
                            onTouchStart={e => { setDragStart(e.changedTouches[0].screenX) }}
                            onTouchEnd={onTouchHandler}
                            onDragStart={e => { setDragStart(e.clientX) }}
                            onDragEnd={onDragHandler}
                            className='slider-divs'
                            style={slideStyle}>
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

