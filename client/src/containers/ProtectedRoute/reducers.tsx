import {
    AUTO_LOGIN_SUCCESS,
    AUTO_LOGIN_FAILURE,
} from './constants'
import {
    IUserProps,
    IAutoLoginAction,
} from "./types";


export const initialState: IUserProps = {
    autoLoginAttempted: false,
    isAuthenticated: false,
    isLoading: true,
    email: undefined,
}

const reducer = (state = initialState, action: IAutoLoginAction) => {
    switch (action.type) {
        case AUTO_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case AUTO_LOGIN_FAILURE:
            return {
                ...state,
                ...action.payload
            }
        case `LOGOUT_SUCCESS`:
            console.log(`was i reduced`)
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default reducer
