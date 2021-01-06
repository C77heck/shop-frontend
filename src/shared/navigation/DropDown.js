import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import Backdrop from '../../shared/UIElements/Backdrop';
import { AuthContext } from '../context/auth-context';



import './DropDown.css';


const DropDown = props => {

    const { userId } = useContext(AuthContext)

    const [display, setDisplay] = useState('none')
    const [show, setShow] = useState(false)

    const onClickHandler = () => {
        setDisplay('block')
        setShow(true)
    }


    useEffect(() => {
        if (show) {
            window.onclick = () => {
                if (display === 'block') {
                    setDisplay('none')
                    setShow(false)
                }
            }
        }
    }, [show, display])





    return (
        <React.Fragment>

            <div className="dropdown">
                <a
                    onClick={onClickHandler}
                >{props.name}</a>
                <div
                    style={{ display: `${display}` }}
                    className="dropdown-content"
                >
                    <Link to={`/userdata/${userId}`} >UPDATE DETAILS</Link>
                    <Link to={`/orderhistory/${userId}`} >ORDER HISTORY</Link>
                </div>
            </div>
        </React.Fragment>

    )
}

export default DropDown;