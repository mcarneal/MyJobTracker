import {
    USER_LOGIN_SUCCESS,
} from './constants'

import {
    IUserLogin,
    IUserLoginAction,
} from "./types";


export const initialState: IUserLogin = {
    isAuthenticated: false,
    isLoading: true,
    email: undefined,
}

const reducer = (state = initialState, action: IUserLoginAction) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export default reducer
