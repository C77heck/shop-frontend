import React, { useEffect, useState } from 'react';

import Calendar from 'react-calendar';
import Modal from '../../shared/UIElements/Modal';

import './DeliveryPicker.css'

const DeliveryPicker = props => {
    const todaysDate = props.date;
    const [date, setDate] = useState({
        minDate: {
            year: '',
            month: '',
            day: ''
        },
        maxDate: {
            year: '',
            month: '',
            day: ''
        }
    })


    useEffect(() => {
        const todaysDate = new Date()
        setDate({
            minDate: {
                year: todaysDate.getFullYear(),
                month: todaysDate.getMonth(),
                day: todaysDate.getDate() + 2
            },
            maxDate: {
                year: todaysDate.getFullYear(),
                month: todaysDate.getMonth() + 1,
                day: todaysDate.getDate()
            }
        })
    }, [todaysDate])



    return (
        <Modal
            className='date-picker__modal'
            onCancel={props.onClear}
            show={!!props.show}
            header={'Pick a date'}

        >
            <Calendar
                onChange={props.onChange}
                value={props.value}
                minDate={new Date(date.minDate.year, date.minDate.month, date.minDate.day)}
                maxDate={new Date(date.maxDate.year, date.maxDate.month, date.maxDate.day)}
            />
        </Modal>
    )
}

export default DeliveryPicker;