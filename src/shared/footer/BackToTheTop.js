import React from 'react';

import './footer.css'

const BackToTheTop = props => {

    const clickHandler = () => {
        window.scrollTo(0, 0, "smooth");
    }
    return (
        <React.Fragment>
            <button
                className={`scroll-to__the-top ${props.show}`}
                onClick={clickHandler}
            ><img src="/images/icons/up-icon.svg" alt="up arrow" />
            </button>
        </React.Fragment>

    )
}



export default BackToTheTop;