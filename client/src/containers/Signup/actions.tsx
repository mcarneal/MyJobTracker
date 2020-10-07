// import MasterDataApiController from "../../api/Master-Data";
import {
    CREATE_USER_SUCCESS
} from "./constants"
import {
    CreateUser,
} from "./types";
import { push } from "connected-react-router";
import SignupUserController from "../../api/Signup";

export const submitCreateUser = ({
    email,
    password,
}: any) => {
    return async (dispatch: any)  => {
        try {
            await SignupUserController.createUser({
                email,
                password,
            })
             dispatch(createUserSuccess({
                isLoading: false,
                email,
            }))
             dispatch(push(`/home`))
        } catch (e) {
            console.log(`Error occurred creating user: ${e}`)
        }
    };
};


export const createUserSuccess = (payload: CreateUser) => ({
    type: CREATE_USER_SUCCESS,
    payload
});
//
// const getDataFailure = (payload: Item) => ({
//     type: FETCH_FAILED,
//     payload
// });
