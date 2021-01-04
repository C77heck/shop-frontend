import { useEffect, useState, useCallback, useContext } from 'react';

import { useHttpClient } from './http-hook';
import { usePurchase } from './purchase-hook';

let timer;

export const useAuth = () => {
    const { saveToLocalStorage } = usePurchase();
    const { sendRequest } = useHttpClient();
    const [token, setToken] = useState(false);
    const [expiration, setExpiration] = useState()
    const [userId, setUserId] = useState(false)
    const [email, setEmail] = useState()

    const signin = useCallback((uid, token, expiration) => {
        (async () => {
            try {
                const responseData = await sendRequest(process.env.REACT_APP_BACKEND)
                saveToLocalStorage(responseData.products.map(i => {
                    return {
                        ...i,
                        number: 0,
                        totalPrice: 0
                    }
                }))
            } catch (err) {
            }
        })()
        setToken(token);
        setUserId(uid);
        setEmail(email)
        const tokenExpiration = expiration || new Date(new Date().getTime() + 1000 * 60 * 60)
        setExpiration(tokenExpiration)

        localStorage.setItem('userData',
            JSON.stringify({
                userId: uid,
                token: token,
                expiration: tokenExpiration.toISOString()
            })
        )
    }, []);

    const signout = useCallback(async () => {
        setToken(null);
        setUserId(null)
        setExpiration(null)
        try {
            const userID = JSON.parse(localStorage.getItem('userData')).userId;
            localStorage.removeItem('userData')
            localStorage.removeItem('basketContent')
            await sendRequest(process.env.REACT_APP_SIGNOUT + userID)
        } catch (err) {
            console.log(err)
        }
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'))
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            signin(storedData.userId, storedData.token, new Date(storedData.expiration))
        }
    }, [signin])



    useEffect(() => {
        if (token && expiration) {

            const remainingTime = expiration.getTime() - new Date().getTime();
            timer = setTimeout(signout, remainingTime)
        } else {
            clearTimeout(timer);
        }
    }, [token, signout, expiration, userId])

    return { signin, signout, token, userId }
}