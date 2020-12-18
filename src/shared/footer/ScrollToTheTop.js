import React from 'react';

import './footer.css'

const ScrollToTop = props => {

    const clickHandler = () => {
        window.scrollTo(0, 0, "smooth");
    }
    return (
        <React.Fragment>
            <ScrollToTop />
            <button
                className={`scroll-to__the-top ${props.show}`}
                onClick={clickHandler}
            >Back to the top</button>
        </React.Fragment>

    )
}



export default ScrollToTop;