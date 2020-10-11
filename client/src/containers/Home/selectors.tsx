import { createSelector, } from 'reselect'
import { initialState} from "./reducers";

const selectViewsDomain = (state: any ) => state.user

const makeUserEmail = () =>
    createSelector(
        selectViewsDomain,
        subState => subState,
    )
// const makeIsFetching = () =>
//     createSelector(
//         selectViewsDomain,
//         subState => subState.isFetching,
//     )

export default selectViewsDomain
export {
    selectViewsDomain,
    makeUserEmail,
    // makeIsFetching,
}
