import { createSelector, } from 'reselect'
import { initialState, } from './reducers'
import { ItemComponent} from "./types";

const selectViewsDomain = (state: ItemComponent) => state.items || initialState

const makeViewIcons = () =>
    createSelector(
        selectViewsDomain,
        substate => substate.items,
    )
const makeIsFetching = () =>
    createSelector(
        selectViewsDomain,
        substate => substate.isFetching,
    )

export default selectViewsDomain
export {
    selectViewsDomain,
    makeViewIcons,
    makeIsFetching,
}
