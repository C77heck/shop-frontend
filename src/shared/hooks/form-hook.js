import { useReducer, useCallback } from "react"


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

    const handler = useCallback((id, value, valid) => {
        dispatch({
            type: 'CHANGE',
            value: value,
            inputId: id,
            valid: valid === 'true' ? true : false
        })
    }, [])

    const setFormData = useCallback((inputs) => {
        dispatch({
            type: 'SET_DATA',
            inputs: inputs
        });
    }, []);

    return [inputState, handler, setFormData]
}

