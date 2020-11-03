import { createSelector, } from 'reselect'
import { initialState, } from './reducers'
import {
    IUser,
} from "./types";


const selectUserDomain = (state: IUser ) => state.user || initialState

const makeIsAuthenticated = () =>
    createSelector(
        selectUserDomain,
        subState => subState.isAuthenticated,
    )
const makeAutoLoginAttempted = () =>
    createSelector(
        selectUserDomain,
        subState => subState.autoLoginAttempted,
    )
const makeUserEmail = () =>
    createSelector(
        selectUserDomain,
        subState => subState.email,
    )
const makeProfilePicture = () =>
    createSelector(
        selectUserDomain,
        subState => subState.email,
    )
const makeUser = () =>
    createSelector(
        selectUserDomain,
        subState => subState,
    )
export default selectUserDomain
export {
    selectUserDomain,
    makeIsAuthenticated,
    makeAutoLoginAttempted,
    makeUserEmail,
    makeProfilePicture,
    makeUser,
}
