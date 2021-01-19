import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth-context';



import './DropDown.css';


const DropDown = props => {

    const { userId } = useContext(AuthContext)

    const [show, setShow] = useState({
        translate: '-100',
        opacity: '0',
        visibility: 'hidden',
        links: false
    })


    // we listen to the click event to close the dropdown and then we remove the listener
    const clickedOutside = () => {
        setShow({
            translate: '-100',
            opacity: '0',
            visibility: 'hidden',
            links: false
        })
        window.onclick = () => { }
    }

    useEffect(() => {
        if (show.links) {
            window.onclick = clickedOutside;
        }
    }, [show.links])




    const onClickHandler = () => {
        if (show.translate === '-100') {
            setShow({
                translate: '0',
                opacity: '1',
                visibility: 'visible',
                links: true
            })
        } else {
            setShow({
                translate: '-100',
                opacity: '0',
                visibility: 'hidden',
                links: false
            })
        }

    }



    return (
        <React.Fragment>

            <p
                onClick={onClickHandler}
            >{props.name}</p>

            <div
                style={{
                    transform: `translateY(${show.translate}%)`,
                    opacity: `${show.opacity}`,
                    transition: "all 300ms ease-in-out",
                    visibility: `${show.visibility}`
                }}
                className="dropdown"
            >

                <div
                    className="dropdown-content"
                >
                    {show.links && <React.Fragment><Link to={`/userdata/${userId}`} >UPDATE DETAILS</Link>
                        <Link to={`/orderhistory/${userId}`} >ORDER HISTORY</Link>
                        <Link to={`/favourites/${userId}`}>FAVOURITES</Link></React.Fragment>}
                </div>
            </div>

        </React.Fragment>

    )
}

export default DropDown;