import { useCallback, useState } from 'react';

export const useAdmin = () => {

    const [adminId, setAdminId] = useState();
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)


    const adminSignin = useCallback(
        (userId, isLoggedIn) => {
            setAdminId(userId)
            setIsAdminLoggedIn(isLoggedIn)
        }, [])
    const adminSignout = useCallback(
        () => {
            setAdminId(null)
            setIsAdminLoggedIn(false)
        }, [])


    return { adminId, isAdminLoggedIn, adminSignin, adminSignout }
}