import { useEffect, useState, useCallback, useContext } from 'react';
import { PurchaseContext } from '../context/purchase-context';


import { useHttpClient } from './http-hook';


let timer;

export const useAuth = () => {

    const { sendRequest } = useHttpClient();
    const [token, setToken] = useState(false);
    const [expiration, setExpiration] = useState()
    const [userId, setUserId] = useState(false)
    const [favourites, setFavourites] = useState([]);


    const signin = useCallback((userData, expiration) => {


        setToken(userData.token);
        setUserId(userData.userId);
        setFavourites(userData.favourites || [])
        const tokenExpiration = expiration || new Date(new Date().getTime() + 1000 * 60 * 60)
        setExpiration(tokenExpiration)

        localStorage.setItem('userData',
            JSON.stringify({
                userId: userData.userId,
                token: userData.token,
                expiration: tokenExpiration.toISOString(),
                favourites: userData.favourites
            })
        )
    }, []);

    const signout = useCallback(async (basketContent) => {
        setToken(null);
        setUserId(null)
        setExpiration(null)



        try {
            const userID = JSON.parse(localStorage.getItem('userData')).userId;
            localStorage.removeItem('userData')

            await sendRequest(process.env.REACT_APP_SIGNOUT + userID)

        } catch (err) {
            console.log(err)
        }
        return true;
    }, [sendRequest]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (
            storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            signin(storedData, new Date(storedData.expiration))
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

    return { signin, signout, token, userId, favourites }
}