import React from 'react';

import { Link } from 'react-router-dom';

import ScrollToTop from './ScrollToTheTop';

import './footer.css'


const Footer = props => {

    return (
        <React.Fragment>
            <ScrollToTop show={props.show} />
            <div style={props.styles} id='footer'>
                {/*                 <div className="icon-cont container-fluid">
                    <a className="footericons" target="_blank" href="https://www.facebook.com/">
                        <i className="social-icon fab fa-facebook-f"></i></a>
                    <a className="footericons" target="_blank" href="https://twitter.com/explore">
                        <i className="social-icon fab fa-twitter"></i></a>
                    <a className="footericons" target="_blank" href="https://www.instagram.com/">
                        <i className="social-icon fab fa-instagram"></i></a>
                    <a className="footericons" target="_blank" href="https://www.linkedin.com/">
                        <i className="social-icon fas fa-envelope"></i></a> */}


                <div className="row ">
                    <div className="grids col-md-12">
                        <Link className="footera" to='/'><span>Privacy policy</span></Link>

                    </div>
                    <div className="grids col-md-12 ">
                        <Link className="footera" to='/'><span >Careers</span></Link>
                    </div>
                    <div className="grids col-md-12 ">
                        <Link className="footera" to='/'><span >Terms & conditions</span></Link>
                    </div>
                    <div className="grids col-md-12 ">
                        <Link className="footera" to='/'>Press</Link>
                    </div>
                </div>
                <p className="bottomp">EMAIL@EMAIL.COM / +44(0)2012345678 / 13 SWALLOW STREET, W12 4DG</p>
                <p className="bottomp"><em>Copyright 2020, Furuma</em></p>
            </div>

        </React.Fragment>


    )
}


export default Footer;