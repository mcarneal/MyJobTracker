import {
    AUTO_LOGIN_SUCCESS,
    AUTO_LOGIN_FAILURE,
} from "./constants"
import {
    IUserProps,
} from "./types";
import LoginController from "../../api/Login";

export const initiateAutoLogin = () => {
    return async (dispatch: any)  => {
        try {
            console.log(`i was logged?`)
            const {
                isAuthenticated,
                user: {
                    displayName : email,
                },
            } = await LoginController.autoLogin()
            dispatch(autoLoginSuccess({
                autoLoginAttempted: true,
                isAuthenticated,
                isLoading: false,
                email,
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
