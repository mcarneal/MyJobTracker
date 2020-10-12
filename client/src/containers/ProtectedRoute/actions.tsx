import {
    AUTO_LOGIN_SUCCESS,
    AUTO_LOGIN_FAILURE,
} from "./constants"
import {
    IUserProps,
} from "./types";

export const initiateAutoLogin = () => {
    return async (dispatch: any)  => {
        try {
            //todo: add api call right here
            dispatch(autoLoginSuccess({
                autoLoginAttempted: true,
                isAuthenticated: true,
                isLoading: false,
                email: `michael`,
            }))
        } catch (e) {
            dispatch(autoLoginFailure({
                autoLoginAttempted: true,
                isAuthenticated: false,
                isLoading: false,
                email: undefined,
            }))
        }
    };
};


export const autoLoginSuccess = (payload: IUserProps) => ({
    type: AUTO_LOGIN_SUCCESS,
    payload
});

const autoLoginFailure = (payload: IUserProps) => ({
    type: AUTO_LOGIN_FAILURE,
    payload
});
