import React, { useState } from 'react';


import './Carousel.css'

import { CSSTransition, TransitionGroup } from 'react-transition-group';



const CarouselImg = props => {

    return (
        <div>
            <img
                key={props.image.id}
                className={props.className}
                src={props.image.src}
                alt={props.image.alt}
            />
        </div>
    )

}

const Carousel = () => {

    const [slide, setSlide] = useState(true)
    const [image, setImage] = useState({
        alt: "Third slide",
        src: "/images/carousel/berries.jpg",
        id: '3'
    })

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

    const right = () => {
        setSlide(prev => !prev)
        setImage(prev => {
            let index;
            if (prev.id === 3) {
                console.log(prev.id)
                index = 0;
            } else {
                index = prev.id + 1;
            }
            console.log(index)
            console.log(images[index])

            return images[index]

        })

    }

    const left = () => {
        setSlide(prev => !prev)
        setImage(prev => {
            console.log(prev.id)
            let index;
            if (prev.id === 0) {
                index = 3;
            } else {
                index = prev.id - 1;
            }
            console.log(index)
            console.log(images[index])

            return images[index]
        })
    }

    console.log(image.id)

    return (
        <React.Fragment>
            <div className='carousel-wrapper'>
                <TransitionGroup>

                    <CSSTransition
                        key={image.id}
                        in={slide}
                        timeout={300}
                        classNames="slide"
                    >

                        <CarouselImg
                            slide={slide}
                            className="car-images"
                            image={image}
                        />
                    </CSSTransition>
                </TransitionGroup>
            </div>
            <button
                className='left-side_controller'
                onClick={left}

            > <span>L</span> </button>
            <button
                className='right-side_controller'
                onClick={right}
            > <span>R</span> </button>

        </React.Fragment>
    )




}


export default Carousel;