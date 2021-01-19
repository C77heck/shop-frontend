import React, { useState, useContext, useEffect, useRef } from 'react';

import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { AuthContext } from '../../shared/context/auth-context';
import { PurchaseContext } from '../../shared/context/purchase-context';
import Button from '../../shared/UIElements/Button';
import MessageModal from '../../shared/UIElements/MessageModal';
import Auth from '../../users/components/Auth';



import './Products.css'

const BuyButton = props => {

    const { isLoggedIn, userId } = useContext(AuthContext);

    const purchase = useContext(PurchaseContext)

    const { code, items, number } = props;
    const [isClicked, setIsClicked] = useState(false);
    const [message, setMessage] = useState()
    const nodeRef = useRef(null)



    useEffect(() => {
        if (isLoggedIn) {
            if (number > 0) {
                setIsClicked(true)
            } else {
                setIsClicked(false)
            }
        } else {
            setIsClicked(false)
        }
    }, [number, isLoggedIn])


    const no = () => {
        setMessage(null)
    }

    const yes = () => {
        purchase.subtract(items, code, userId)
        setIsClicked(false)
        setMessage(null)
    }

    const addButtonHandler = () => {
        if (!isLoggedIn) {
        } else {
            purchase.add(items, code, userId)
            setIsClicked(true)
        }

    }
    const plus = () => {
        purchase.add(items, code, userId)
    }
    const minus = () => {

        if (number === 1) {
            setMessage('Are you sure you want to delete this item from your basket?')
        } else {
            purchase.subtract(items, code, userId)
        }
    };

    return (<React.Fragment>
        <MessageModal
            className='are-you-sure__question'
            message={message}
            onClear={no}
        >
            <Button onClick={yes}>Yes</Button>
            <Button onClick={no}>No</Button>
        </MessageModal>

        <SwitchTransition>
            <CSSTransition
                key={isClicked + '1'}
                nodeRef={nodeRef}
                classNames='fade'
                timeout={80}
            >
                {isClicked ? <div className={`amount-div ${props.className}`}>
                    <button className='shopping-button' onClick={minus}>
                        <span className='minus-sign'>-</span>
                    </button>
                    <input type='text' className='amount-input' readOnly value={number} />
                    <button className='shopping-button' onClick={plus}>
                        <span className='plus-sign'>+</span>
                    </button>
                </div>
                    :
                    <div className={`${props.className}`}>
                        <Auth>
                            <button className='add-button' onClick={addButtonHandler}>ADD</button>
                        </Auth>
                    </div>}
            </CSSTransition>
        </SwitchTransition>
    </React.Fragment>)


}





export default BuyButton;
