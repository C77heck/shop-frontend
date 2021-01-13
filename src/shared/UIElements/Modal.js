import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group'

import Backdrop from './Backdrop'
import './Modal.css'


const ModalOverlay = props => {
    const content = (
        <CSSTransition
            in={props.show}
            mountOnEnter
            unmountOnExit
            timeout={300}
            classNames='modal'
        >

            <div className={`modals ${props.className}`} >

                <header
                    className={`modal__header ${props.headerClass}`}
                    style={props.headerStyle}
                >
                    <h2>{props.header}</h2>
                </header>
                <form onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}>
                    <div className={`modal__content ${props.contentClass}`}>
                        {props.children}
                    </div>
                    <footer style={props.footerStyle} className={`modal__footer ${props.footerClass}`}>
                        {props.footer}
                    </footer>
                </form>
            </div>
        </CSSTransition>

    )
    return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

const Modal = props => {

    return <React.Fragment>
        {props.show && <Backdrop onClick={props.onCancel} />}
        <ModalOverlay {...props} />
        {/* this spread operator syntax sends over the props from Modal to modaloverlay */}
    </React.Fragment>

}



export default Modal;