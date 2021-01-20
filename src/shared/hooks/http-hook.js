import { useState, useCallback, useEffect, useRef } from 'react'

export const useHttpClient = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([])

    const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {

        const httpAbortCtrll = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrll);
        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrll.signal
            });
            setIsLoading(true)
            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrll)
            /* this code is to filter the abort controllers out if the request didn't have to be cancelled */
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setIsLoading(false)
            return responseData;
        } catch (err) {
            setError(err.message)
            setIsLoading(false)
            throw err;
        }
    }, [])

    const applicationError = (err) => {
        setError(err);
    }

    const clearError = () => {
        setError(null)
    }
    useEffect(() => {
        /* clean up if we leave the page */
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
        }
    }, [])
    return { sendRequest, isLoading, error, clearError, applicationError }
}