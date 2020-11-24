import React, { useState } from 'react';

import './Carousel.css'

const Carousel = () => {

    const [disabled, setDisabled] = useState();
    const [firstSlide, setFirstSlide] = useState('position-start1')
    const [secondSlide, setSecondSlide] = useState('position-start2')
    const [thirdSlide, setThirdSlide] = useState('position-start3')
    const [fourthSlide, setFourthSlide] = useState('position-start4')
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
        if (firstSlide === 'position-start1') {
            console.log('we hit the right  if statement')

            setDisabled(true)
            setFirstSlide('exit-right')//mint
            setSecondSlide('enter-right')//ham
            setThirdSlide('move-third_in-position-right')//raspberry
            setFourthSlide('move-fourth_in-position-right')//bbq
            setTimeout(() => {
                setDisabled(false)
                setFirstSlide('position-end_first_move1-right')
                setSecondSlide('position-end_first_move2-right')
                setThirdSlide('position-end_first_move3-right')
                setFourthSlide('position-end_first_move4-right')

            }, 2000)
        } else if (
            firstSlide === 'position-end_first_move1-right'
            ||
            firstSlide === 'position-end_first_move1-left'
        ) {
            console.log(`${firstSlide} we hit the right first else if statement`)

            setDisabled(true)
            setFirstSlide('move_out-of-view-right')//mint
            setSecondSlide('move_out-of-view-right-further')//ham
            setThirdSlide('enter-right')//raspberry
            setFourthSlide('exit-right')//bbq

            setTimeout(() => {
                setDisabled(false)
                setFirstSlide('position-end_second_move1-right')
                setSecondSlide('position-end_second_move2-right')
                setThirdSlide('position-end_second_move3-right')
                setFourthSlide('position-end_second_move4-right')
            }, 2000)

        } else if (
            firstSlide === 'position-end_second_move1-right'
            ||
            firstSlide === 'position-end_second_move1-left'
        ) {
            console.log('we hit the right second else if statement')

            setDisabled(true)
            setFirstSlide('move_out-of-view-right-further')//mint
            setSecondSlide('move_out-of-view-right')//ham
            setThirdSlide('exit-right')//raspberry
            setFourthSlide('enter-right')//bbq

            setTimeout(() => {
                setDisabled(false)
                setFirstSlide('position-end_third_move1-right')
                setSecondSlide('position-end_third_move2-right')
                setThirdSlide('position-end_third_move3-right')
                setFourthSlide('position-end_third_move4-right')
            }, 2000)
        } else if (
            firstSlide === 'position-end_third_move1-right'
            ||
            firstSlide === 'position-end_third_move1-left'
        ) {
            console.log(`${firstSlide} we hit the right third else if statement`)

            setDisabled(true)
            setFirstSlide('enter-right')//mint
            setSecondSlide('exit-right')//ham
            setThirdSlide('move_out-of-view-right-further')//raspberry
            setFourthSlide('move_out-of-view-right')//bbq

            setTimeout(() => {
                setDisabled(false)
                setFirstSlide('position-start1')
                setSecondSlide('position-start2')
                setThirdSlide('position-start3')
                setFourthSlide('position-start4')
            }, 2000)
        } else {
            console.log('we hit the right else statement')

            setDisabled(true)
            setFirstSlide('move-first_back_to-Base-right')//mint
            setSecondSlide('move-second_back_to-Base-right')//ham
            setThirdSlide('move-third_back_to-Base-right')//raspberry
            setFourthSlide('move-fourth_back_to-Base-right')//bbq
            setTimeout(() => {
                setDisabled(false)
                setFirstSlide('position-start1')
                setSecondSlide('position-start2')
                setThirdSlide('position-start3')
                setFourthSlide('position-start4')

            }, 2000)
        }

    }

    const left = () => {
        if (firstSlide === 'position-start1') {
            console.log('we hit the left if statement')
            setDisabled(true)
            setFirstSlide('exit-left')
            setSecondSlide('move-fourth_in-position-left ')
            setThirdSlide('move-third_in-position-left')
            setFourthSlide('enter-left')
            setTimeout(() => {
                setDisabled(false)
                setFirstSlide('position-end_first_move1-left') //mint
                setSecondSlide('position-end_first_move2-left') //ham
                setThirdSlide('position-end_first_move3-left') //raspberry
                setFourthSlide('position-end_first_move4-left') //bbq
            }, 2000)
        } else if (
            firstSlide === 'position-end_first_move1-right'
            ||
            firstSlide === 'position-end_first_move1-left'
        ) {
            console.log('we hit the left first else if statement')

            setDisabled(true)
            setFirstSlide('move-further-left')//mint
            setSecondSlide('move-third_in-position-left ')//ham
            setThirdSlide('enter-left')//raspberry
            setFourthSlide('exit-left')//bbq

            setTimeout(() => {
                setDisabled(false)
                setFirstSlide('position-end_second_move1-left')
                setSecondSlide('position-end_second_move2-left')
                setThirdSlide('position-end_second_move3-left')
                setFourthSlide('position-end_second_move4-left')

            }, 2000)
        } else if (
            firstSlide === 'position-end_second_move1-right'
            ||
            firstSlide === 'position-end_second_move1-left'
        ) {
            console.log('we hit the left second else if statement')

            setDisabled(true)
            setFirstSlide('move-even_further-left')//mint
            setSecondSlide('enter-left')//ham
            setThirdSlide('exit-left')//raspberry
            setFourthSlide('move-further-left')//bbq

            setTimeout(() => {
                setDisabled(false)
                setFirstSlide('position-end_third_move1-left')
                setSecondSlide('position-end_third_move2-left')
                setThirdSlide('position-end_third_move3-left')
                setFourthSlide('position-end_third_move4-left')

            }, 2000)
        } else {
            console.log('we hit the left  else  statement')

            setDisabled(true)
            setFirstSlide('move-first_back_to-Base-left')//mint
            setFourthSlide('move-fourth_back_to-Base-left')//bbq
            setThirdSlide('move-third_back_to-Base-left')//raspberry
            setSecondSlide('move-second_back_to-Base-left')//ham


            setTimeout(() => {
                setDisabled(false)
                setFirstSlide('position-start1')
                setSecondSlide('position-start2')
                setThirdSlide('position-start3')
                setFourthSlide('position-start4')

            }, 2000)
        }
    }



    return (
        <React.Fragment>
            <div className='carouse-outer_div'>
                <div className='carousel-wrapper'>

                    <img
                        className={`car-images  ${firstSlide}`}
                        src={images[0].src}
                        alt={images[0].alt}
                    />

                    <img
                        className={`car-images  ${secondSlide} `}
                        src={images[1].src}
                        alt={images[1].alt}
                    />
                    <img
                        className={`car-images  ${thirdSlide} `}
                        src={images[2].src}
                        alt={images[2].alt}
                    />
                    <img
                        className={`car-images  ${fourthSlide} `}
                        src={images[3].src}
                        alt={images[3].alt}
                    />
                </div>
                <button
                    className='left-side_controller'
                    onClick={left}
                    disabled={disabled}

                >
                    <img src="/images/icons/left-arrow.svg" alt="left arrow" />
                </button>
                <button
                    className='right-side_controller'
                    onClick={right}
                    disabled={disabled}
                >
                    <img src="/images/icons/right-arrow.svg" alt="right arrow" />
                </button>
            </div>
        </React.Fragment>
    )



}

export default Carousel;
