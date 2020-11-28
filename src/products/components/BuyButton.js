import React, { useState, useContext, useEffect } from 'react';

import { CSSTransition, SwitchTransition } from 'react-transition-group';

import { PurchaseContext } from '../../shared/context/purchase-context'
import MessageModal from '../../shared/UIElements/MessageModal'

import './Products.css'

const BuyButton = props => {

    const purchase = useContext(PurchaseContext)
    const {code, items} = props;
    const [isClicked, setIsClicked] = useState(false);
    const [number, setNumber] = useState(0)
    const [message, setMessage] = useState()


    useEffect(() => {
        try {
            purchase.basketItems.forEach(i => {
                if (i.code === code) {
                    setNumber(i.number)
                    setIsClicked(true)
                }
            })
        } catch (err) {
        }
    })


    const no = () => {
        setMessage(null)
    }

    const yes = () => {
        purchase.subtract(code)
        setIsClicked(false)
        setMessage(null)
    }

    const buttonHandler = () => {
        setNumber(1)
        setIsClicked(true)
        purchase.getNumber(1);
        purchase.add(items, code)

    }
    const plus = () => {
        setNumber(prev => prev + 1)
        purchase.getNumber(number + 1);
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
            purchase.getNumber(number - 1);


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
                        <button className='add-button' onClick={buttonHandler}>ADD</button>
                    </div>}

            </CSSTransition>
        </SwitchTransition>
    </React.Fragment>)


}





export default BuyButton;
