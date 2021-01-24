import React, { useEffect, useState } from 'react';

import './CustomSelect.css'


const hints = [
    { value: 'Your childhood nickname?', id: 1 },
    { value: 'Your favorite childhood friend?', id: 2 },
    { value: 'Where did your parents meet?', id: 3 },
    { value: 'what is your most hated movie?', id: 4 }
]
const resourcePlace = [
    { value: 'carousel', id: 1 },
    { value: 'newsCard', id: 2 },
    { value: 'productCarousel', id: 3 },
    { value: 'background', id: 4 }
]

const CustomSelect = props => {

    const [type, setType] = useState([]);
    useEffect(() => {
        if (props.type === 'hints') {
            setType(hints)
        } else {
            setType(resourcePlace)
        }
    }, [])


    return (
        <div className="custom-select">
            <select onChange={props.onChange}>
                {props.value ? <option value={props.value}>{props.value}</option>
                    :
                    <option value={'0'}>{props.instruction}</option>}
                {type.map(i => {
                    return <option key={i.id} value={i.value}>{i.value}</option>
                })}
            </select>
        </div>
    )
}

export default CustomSelect;
