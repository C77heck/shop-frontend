import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { PurchaseContext } from '../../shared/context/purchase-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import Auth from '../../users/components/Auth';


import './Products.css'


const FavouriteIcon = props => {

    const { favouriteHandler, basketContent } = useContext(PurchaseContext)
    const { isLoggedIn } = useContext(AuthContext);


    const { userId, token } = useContext(AuthContext)
    const { sendRequest } = useHttpClient()

    const [color, setColor] = useState(false)


    useEffect(() => {
        if (basketContent) {
            if (props.favourite) {
                setColor(true)
            } else {
                setColor(false)
            }
        }
    }, [props.favourite, basketContent])


    const onClickHandler = async () => {
        console.log('we got clicked')
        try {
            setColor(prev => {
                favouriteHandler(props.products, props.id, !prev)
                return !prev
            })
            const responseData = await sendRequest(process.env.REACT_APP_FAVOURITE + userId,
                'POST',
                JSON.stringify({
                    productId: props.id
                }),
                {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            )

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <Auth>
            <svg
                onClick={isLoggedIn ? onClickHandler : () => { }}
                style={{ color: color ? '#e0ae24' : '#BEC9C7' }}
                className="favourite-icon"
                height="511pt"
                viewBox="0 -10 511.99143 511"
                width="511pt"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    fill='currentColor'
                    d="m510.652344 185.882812c-3.371094-10.367187-12.566406-17.707031-23.402344-18.6875l-147.796875-13.417968-58.410156-136.75c-4.3125-10.046875-14.125-16.53125-25.046875-16.53125s-20.738282 6.484375-25.023438 16.53125l-58.410156 136.75-147.820312 13.417968c-10.835938 1-20.011719 8.339844-23.402344 18.6875-3.371094 10.367188-.257813 21.738282 7.9375 28.925782l111.722656 97.964844-32.941406 145.085937c-2.410156 10.667969 1.730468 21.699219 10.582031 28.097656 4.757813 3.457031 10.347656 5.183594 15.957031 5.183594 4.820313 0 9.644532-1.28125 13.953125-3.859375l127.445313-76.203125 127.421875 76.203125c9.347656 5.585938 21.101562 5.074219 29.933593-1.324219 8.851563-6.398437 12.992188-17.429687 10.582032-28.097656l-32.941406-145.085937 111.722656-97.964844c8.191406-7.1875 11.308594-18.535156 7.9375-28.925782zm-252.203125 223.722657" />
            </svg>
        </Auth>
    )
}


export default FavouriteIcon;