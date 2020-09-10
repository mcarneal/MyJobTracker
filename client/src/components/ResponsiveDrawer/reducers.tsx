import {
    FETCH_SUCCESS,
    FETCH_FAILED,
} from './constants'
import {
    ItemComponent,
    CollectItemAction,
} from "./types";


export const initialState: ItemComponent = {
    isFetching: false,
    items: [],
}

const reducer = (state = initialState, action: CollectItemAction) => {
    switch (action.type) {
        case FETCH_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case FETCH_FAILED:
            return {
                ...state,
                ...action.payload
            }
        default:
            return initialState
    }
}

export default reducer
