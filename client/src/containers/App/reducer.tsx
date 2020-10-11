import {
    ADD_FORECAST,
} from './constants'
import {
    Message,
    SendMessageAction,
} from "./types";


const initialState: Message = {
    name: '',
    age: 0,
}

const reducer = (
    state = initialState,
    action: SendMessageAction
) => {
    switch (action.type) {
        case ADD_FORECAST:
            return {
                ...state,
                ...action.payload
            }
        default:
            return initialState
    }
}


export default reducer
