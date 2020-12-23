import React, { useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import './footer.css'

const BackToTheTop = props => {
    const [display, setDisplay] = useState(false)


    const displayButton = () => {
        if (window.scrollY < 800) {
            setDisplay(false)
        } else {
            setDisplay(true)
        }
    }
    
    window.addEventListener('scroll', displayButton)

    const clickHandler = () => {
        window.scrollTo(0, 0, "smooth");
    }

    return (
        <React.Fragment>
            <CSSTransition
                in={display}
                timeout={500}
                classNames="appear"
                mountOnEnter
                unmountOnExit
            >
                <button
                    className={`scroll-to__the-top ${props.show}`}
                    onClick={clickHandler}
                ><img src="/images/icons/up-icon.svg" alt="up arrow" />
                </button>
            </CSSTransition>

        </React.Fragment>

    )
}



export default BackToTheTop;