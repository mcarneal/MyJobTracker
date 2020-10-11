import {
    CREATE_USER_SUCCESS,
} from './constants'
import {
    CreateUser,
    CreateUserAction,
} from "./types";


export const initialState: CreateUser = {
    isLoading: true,
    email: undefined,
    isAuthenticated: false,
}

const reducer = (state = initialState, action: CreateUserAction) => {
    switch (action.type) {
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export default reducer
