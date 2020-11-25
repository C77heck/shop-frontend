import React, { useState, useEffect } from 'react';


import './Carousel.css';

const images = [
    {
        alt: "First slide",
        src: "/images/carousel/vegies.jpg",
        id: 0
    },
    {
        alt: "Second slide",
        src: "/images/carousel/hams.jpg",
        id: 1
    },
    {
        alt: "Third slide",
        src: "/images/carousel/berries.jpg",
        id: 2
    },
    {
        alt: "Fourth slide",
        src: "/images/carousel/BBQ.jpg",
        id: 3
    }
]

const Carousel = props => {


    const [slideStyle, setSlideStyle] = useState();
    const [carousel, setCarousel] = useState({
        activeSlide: 0,
        translate: 0,
        transition: 8,
        slides: props.slides || images

    })
    const { translate, activeSlide, slides, transition } = carousel;


    useEffect(() => {
        setSlideStyle({
            transform: `translateX(-${translate}%)`,
            transition: `transform 0.8s`

        })
    }, [translate, activeSlide])


    const arrowLeftHandler = () => {

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

    const arrowRightHandler = () => {

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
    return (
        <div className='carouse-outer_div'>
            <div className='carousel-wrapper'>
                {props.element === 'img' ? carousel.slides.map((i) => {
                    return (<img
                        key={i.id}
                        className={`carousel-images`}
                        style={slideStyle}
                        src={i.src}
                        alt={i.alt}
                    />)
                }) :
                    carousel.slides.map((i) => {
                        return (<div
                            key={i.id}
                            className={`carousel-images`}
                            style={slideStyle}
                            src={i.src}
                            alt={i.alt}
                        />)
                    })
                }
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


export default Carousel;