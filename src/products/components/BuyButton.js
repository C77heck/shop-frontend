import React, { useState, useContext, useEffect } from 'react';


import { PurchaseContext } from '../../shared/context/purchase-context'
import MessageModal from '../../shared/UIElements/MessageModal'

import './Products.css'

const BuyButton = props => {

    const purchase = useContext(PurchaseContext)
    const items = props.items;
    const code = props.code;
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
    }, [])


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


    const clicked = (
        <React.Fragment>
            <MessageModal message={message} onClear={no} no={no} yes={yes} />
            <div>
                <button className='shopping-button' onClick={minus}><span className='minus-sign'>-</span></button>
                <div className='amount-div'><input type='text' className='amount-input' readOnly value={number} /></div>
                <button className='shopping-button' onClick={plus}><span className='plus-sign'>+</span></button>
            </div>
        </React.Fragment>
    );

    const notClicked = (
        <div>
            <button className='add-button' onClick={buttonHandler}>ADD</button>
        </div>
    );

    return isClicked ? clicked : notClicked;



}

export default BuyButton;
