import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';

import './NotMe.css';


const NotMe = () => {

    const { requestId } = useParams()
    const { sendRequest } = useHttpClient()


    useEffect(() => {
        (async () => {

            try {
                await sendRequest(process.env.REACT_APP_NOT_ME + requestId)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [requestId, sendRequest])


    return (
        <div className='not-me__container' >
            <h1>Your account has been secured!</h1>
            <p>We now have blocked any attempt to request a new  password for 24 hours from the login page</p>
            <p>We strongly suggest that you change your password to your email account as well as your
            Furuma account as safety precautions.
            
            You may change your password in the "my account", "update details"</p>
            <p>Sincerely</p>
            <p>Furuma team</p>
        </div>
    )
}

export default NotMe;