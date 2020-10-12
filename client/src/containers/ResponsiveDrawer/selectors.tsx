import { createSelector, } from 'reselect'
import { initialState, } from './reducers'
import { Item } from "./types";

const selectViewsDomain = (state: Item ) => state.items || initialState

const makeViewIcons = () =>
    createSelector(
        selectViewsDomain,
        subState => subState.items,
    )
const makeIsFetching = () =>
    createSelector(
        selectViewsDomain,
        subState => subState.isFetching,
    )

export default selectViewsDomain
export {
    selectViewsDomain,
    makeViewIcons,
    makeIsFetching,
}
