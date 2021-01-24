import { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';


import { useHttpClient } from './http-hook';


let timer;

export const useAuth = () => {

    const history = useHistory()

    const { sendRequest } = useHttpClient();
    const [token, setToken] = useState(false);
    const [expiration, setExpiration] = useState()
    const [userId, setUserId] = useState(false)
    const [favourites, setFavourites] = useState([]);


    const signin = useCallback((userData, expiration) => {

        setToken(userData.token);
        setUserId(userData.userId);
        setFavourites(userData.favourites || []);
        const tokenExpiration = expiration || new Date().getTime() + 1000 * 60 * 30;// half an hour expiration time
        setExpiration(tokenExpiration);

        localStorage.setItem('userData',
            JSON.stringify({
                userId: userData.userId,
                token: userData.token,
                expiration: tokenExpiration,
                favourites: userData.favourites
            })
        );
    }, []);

    const signout = useCallback(async () => {
        setToken(null);
        setUserId(null)
        setExpiration(null)
        try {
            const userID = JSON.parse(localStorage.getItem('userData')).userId;
            localStorage.removeItem('userData')
            await sendRequest(process.env.REACT_APP_SIGNOUT + userID)
            history.push('/')
        } catch (err) {
            console.log(err)
        }
        return true;
    }, [sendRequest]);

    //AUTOMATED SINGIN/SIGNOUT BASED ON EXPIRATION TIME. 
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'));
        if (
            storedData &&
            storedData.token &&
            storedData.expiration > new Date().getTime()
        ) {
            signin(storedData, new Date(storedData.expiration))
        }
    }, [signin]);


    useEffect(() => {
        if (token && expiration) {

            const remainingTime = expiration - new Date().getTime();
            timer = setTimeout(signout, remainingTime)
        } else {
            clearTimeout(timer);
        }
    }, [token, signout, expiration, userId])

    return { signin, signout, token, userId, favourites }
}