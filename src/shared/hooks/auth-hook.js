import { useEffect, useState, useCallback } from 'react';


import { useHttpClient } from './http-hook';


let timer;

export const useAuth = () => {

    const { sendRequest } = useHttpClient();
    const [token, setToken] = useState(false);
    const [expiration, setExpiration] = useState()
    const [userId, setUserId] = useState(false)
    const [email, setEmail] = useState()
    const [favourites, setFavourites] = useState([]);
    const signin = useCallback((userData, expiration) => {


        setToken(userData.token);
        setUserId(userData.userId);
        setEmail(userData.email)
        setFavourites(userData.favourites)
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
        return true;
    }, []);

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
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

    return { signin, signout, token, userId, favourites }
}