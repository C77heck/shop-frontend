import { useState, useCallback } from 'react'


export const useAuth = () => {

    const [isloggedIn, setIsLoggedIn] = useState(false)
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    //later deal with it...

    const signin = useCallback((uid, token) => {
        setToken(token);
        setUserId(uid);
        setIsLoggedIn(true)
    }, []);

    const signout = useCallback(() => {
        setToken(null);
        setUserId(null)
        setIsLoggedIn(false)
    }, []);


    return {
        isloggedIn,
        isAdmin,
        token,
        userId,
        signin,
        signout
    }
}