import React, { useState, useContext, useEffect } from 'react';

import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { PurchaseContext } from '../../shared/context/purchase-context'
import { useAuth } from '../../shared/hooks/auth-hook';
import MessageModal from '../../shared/UIElements/MessageModal'

import './Products.css'

const BuyButton = props => {

    const { isLoggedIn } = useAuth();

    const purchase = useContext(PurchaseContext)

    const { code, items } = props;
    const [isClicked, setIsClicked] = useState(false);
    const [number, setNumber] = useState()
    const [message, setMessage] = useState()


    useEffect(() => {
        if (props.number > 0) {
            setNumber(props.number)
            setIsClicked(true)
        }
        purchase.updateBasket(items)
    }, [])




    const no = () => {
        setMessage(null)
    }

    const yes = () => {
        purchase.subtract(items, code)
        setIsClicked(false)
        setMessage(null)
    }

    const addButtonHandler = () => {
        if (isLoggedIn) {
            setNumber(1)
            purchase.add(items, code)
            setIsClicked(true)
        } else {
            console.log(isLoggedIn)
        }

    }
    const plus = () => {
        setNumber(prev => prev + 1)
        purchase.add(items, code)
    }
    const minus = () => {
        setNumber(() => {
            if (number > 1) {
                return number - 1;
            }
            return number;
        })
        if (number === 1) {
            setMessage('Are you sure you want to delete this item from your basket?')
        } else {
            purchase.subtract(items, code)
        }
    };

    return (<React.Fragment>
        <MessageModal message={message} onClear={no} no={no} yes={yes} />

        <SwitchTransition>
            <CSSTransition
                key={isClicked + '1'}
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
                        <button className='add-button' onClick={addButtonHandler}>ADD</button>
                    </div>}
            </CSSTransition>
        </SwitchTransition>
    </React.Fragment>)


}





export default BuyButton;
