import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import './DropDown.css';


const DropDown = props => {
    const [display, setDisplay] = useState('none')


    const onClickHandler = () => {
        setDisplay(prev => {
            return prev === 'none' ? 'block' : 'none'
        })

    }

    return (
        <div className="dropdown">
            <a
                onClick={onClickHandler}
            >{props.name}</a>
            <div
                style={{ display: `${display}` }}
                className="dropdown-content"
            >
                <Link to='/userdata' >Update details</Link>
                <Link to='/orderhistory' >order history</Link>
            </div>
        </div>
    )
}

export default DropDown;