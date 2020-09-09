import { createSelector, } from 'reselect'
import { initialState, } from './reducers'

const selectViewsDomain = (state: { items: any }) => state.items || initialState

const makeForecastRows = () =>
    createSelector(
        selectViewsDomain,
        substate => substate,
    )

export default selectViewsDomain
export {
    selectViewsDomain,
    makeForecastRows,
}
