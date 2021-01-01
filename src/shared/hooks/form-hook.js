import { useReducer, useCallback, useState, useEffect } from "react"


const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                inputs: action.inputs,
            };

        case 'CHANGE':

            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {
                        value: action.value,
                        valid: action.valid
                    },
                }
            };
        default:
            return state;
    }
}


export const useInput = (inputs) => {
    const [inputState, dispatch] = useReducer(reducer, {
        inputs: inputs,
    })

    const [isFormValid, setIsFormValid] = useState(false)



    useEffect(() => {
        let falsy = 0;
        for (let i in inputState.inputs) {
            if (inputState.inputs[i].valid === false) {
                falsy += 1;
            }
        }
        if (falsy !== 0) {
            setIsFormValid(true)
        } else {
            setIsFormValid(false)
        }

    }, [inputState.inputs])




    const handler = useCallback((id, value, valid) => {
        dispatch({
            type: 'CHANGE',
            value: value,
            inputId: id,
            valid: valid
        })
    }, [])

    const setFormData = useCallback((inputs) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputs
        });
    }, []);

    return [inputState, handler, isFormValid, setFormData]
}

