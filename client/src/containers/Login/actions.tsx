import {
    USER_LOGIN_SUCCESS,
} from "./constants"
import {
    ISubmitUserLogin,
    IUserLoginSuccessPayload,
} from "./types";
import { push } from "connected-react-router";
import LoginController from "../../api/Login";


export const submitUserLogin = ({
    email,
    password,
}: ISubmitUserLogin) => {
    return async (dispatch: any)  => {
        try {
            await LoginController.login({
                username: email,
                password,
            })
            dispatch(userLoginSuccess({
                isLoading: false,
                email,
                isAuthenticated: true,
            }))
            dispatch(push(`/home`))
        } catch (e) {
            console.log(`Error occurred creating user: ${e}`)
        }
    };
};


export const userLoginSuccess = (payload: IUserLoginSuccessPayload) => ({
    type: USER_LOGIN_SUCCESS,
    payload
});
//
// const getDataFailure = (payload: Item) => ({
//     type: FETCH_FAILED,
//     payload
// });
