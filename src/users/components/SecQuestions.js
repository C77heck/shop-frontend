import React from 'react';

import './SecQuestion.css'


const hints = [
    { hint: 'Your childhood nickname?', id: 1 },
    { hint: 'Your favorite childhood friend?', id: 2 },
    { hint: 'Where did your parents meet?', id: 3 },
    { hint: 'what is your most hated movie?', id: 4 }
]

const SecQuestions = props => {



    return (
        <div className="custom-select">
            <select onChange={props.onChange}>
                {props.value ? <option value={props.value}>{props.value}</option>
                    :
                    <option value={'0'}>{'Choose a security question:'}</option>}
                {hints.map(i => {
                    if (props.value !== i.hint) {
                        return <option key={i.id} value={i.hint}>{i.hint}</option>
                    }
                    return null;
                })}
            </select>

        </div>
    )
}

export default SecQuestions;
