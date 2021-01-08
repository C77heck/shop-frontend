import React from 'react';

import { Link } from 'react-router-dom';

import BackToTop from './BackToTheTop';
import { Facebook, Linkedin, Twitter, Instagram } from './SocialMedia'



import './footer.css'


const Footer = props => {

    return (
        <React.Fragment>
            <BackToTop show={props.show} />
            <div style={props.styles} className={`footer ${props.className}`}>

                <Facebook link='' />
                <Linkedin link='' />
                <Twitter link='' />
                <Instagram link='' />

                <div className="row ">
                    <div className="footer-grids">
                        <Link className="footera" to='/'><span>Privacy policy</span></Link>

                    </div>
                    <div className="footer-grids">
                        <Link className="footera" to='/'><span >Careers</span></Link>
                    </div>
                    <div className="footer-grids">
                        <Link className="footera" to='/'><span >Terms & conditions</span></Link>
                    </div>
                    <div className="footer-grids">
                        <Link className="footera" to='/'>Press</Link>
                    </div>
                </div>
                <p>EMAIL@EMAIL.COM / +44(0)2012345678 / 13 SWALLOW STREET, W12 4DG</p>
                <p><em>Copyright 2020, Furuma</em></p>
            </div>

        </React.Fragment>


    )
}


export default Footer;