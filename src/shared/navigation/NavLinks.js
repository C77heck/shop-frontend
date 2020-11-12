import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import MapModal from '../UIElements/MapModal';
import Map from '../UIElements/Map';
import Signin from '../../users/components/Signin';
import Signup from '../../users/components/Signup';

import './NavLinks.css';

const NavLinks = () => {
    const [registering, setRegistering] = useState(false);
    const [clickedSignIn, setClickedSignIn] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [input, setInput] = useState({
        fName: '',
        surname: '',
        email: '',
        password: ''
    })

    const inputHandler = e => {
        const { name, value } = e.target;
        console.log(name + ' ' + value)
        setInput(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const signinModalHandler = () => { setClickedSignIn(true) }

    const signInClose = () => {
        setClickedSignIn(false)
        setRegistering(false)
    }
    const signin = e => {
        e.preventDefault();
    }

    const register = () => {
        setClickedSignIn(false)
        setRegistering(true)

    }
    const signup = () => {

    }

    const openMapHandler = () => {
        setClicked(true)
    }
    const cancel = () => {
        setClicked(false)
    }

    return (
        <React.Fragment>
            <MapModal
                footerClass={'modal__footer-colored'}
                className={'map-modal'}
                show={clicked}
                onClick={cancel}
                onClear={cancel}
            >
                <div className="map-container">
                    <Map />
                </div>
            </MapModal>
            <Signin
                header='login required'
                show={clickedSignIn}
                onClear={signInClose}
                register={register}
                onChange={inputHandler}
                value={input}
                onSubmit={signin}

            />
            <Signup
                header='Registering is quick and easy'
                show={registering}
                onClear={signInClose}
                register={register}
                onChange={inputHandler}
                value={input}
                onSubmit={signup}
            />
            <ul className="nav-links">
                <div className='nav-links__div'>
                    <li>
                        <NavLink to='/' exact>HOME</NavLink>
                    </li>
                    <li>
                        <NavLink to='/shopping' exact>GROCERIES</NavLink>
                    </li>
                    <li >
                        <NavLink to='/about' exact>ABOUT US</NavLink>
                    </li>
                    <li>
                        <a onClick={openMapHandler}>STORE FINDER</a>
                    </li>
                    <li>
                        <NavLink to='/contact' exact>CONTACT US</NavLink>
                    </li>
                </div>
                <div className='auth-container'>
                    <button onClick={signinModalHandler}>
                        <img src="/images/icons/user-other.svg" alt="basket" />
                        <span>SIGN IN</span>
                    </button>
                </div>
            </ul>
        </React.Fragment>
    )
}

export default NavLinks;
