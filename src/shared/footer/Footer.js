import React from 'react';



import './footer.css'


const Footer = props => {

    return (
        <React.Fragment>
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
                        <a className="footera" href="#"><span>Privacy policy</span></a>

                    </div>
                    <div className="grids col-md-12 ">
                        <a className="footera" href="#"><span >Careers</span></a>
                    </div>
                    <div className="grids col-md-12 ">
                        <a className="footera" href="#"><span >Terms & conditions</span></a>
                    </div>
                    <div className="grids col-md-12 ">
                        <a className="footera" href="#">Press</a>
                    </div>
                </div>
                <p className="bottomp">EMAIL@EMAIL.COM / +44(0)2012345678 / 13 SWALLOW STREET, W12 4DG</p>
                <p className="bottomp"><em>Copyright 2020, Furuma</em></p>
            </div>

        </React.Fragment>


    )
}


export default Footer;