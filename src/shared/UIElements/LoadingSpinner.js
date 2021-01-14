import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = props => {
    console.log(props.location)
    return (
        <div className={`${props.asOverlay && 'loading-spinner__overlay'}  spinner-container`}>
            <div className="loader_center"></div>
            <div className="loader"></div>
            <div className="second_loader"></div>
            <div className="third_loader"></div>
        </div>
    )
}


export default LoadingSpinner;

