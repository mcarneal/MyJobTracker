/*
 *
 * Forecast reducer
 *
 */
// import {
//     ADD_FORECAST,
// } from './constants'
// import {
//     Message,
//     SendMessageAction,
// } from "./types";

interface ItemComponent {
    isFetching: boolean
    items?: [],
}

export interface CollectItemAction {
    type: string
    payload: ItemComponent
}

export const initialState: ItemComponent = {
    isFetching: false,
    items: [],
}


const reducer = (state = initialState, action: CollectItemAction) => {
    switch (action.type) {
        case `FETCH_SUCCESS`:
            return {
                ...state,
                ...action.payload
            }
        case `FETCH_FAILED`:
            return {
                ...state,
                ...action.payload
            }
        default:
            return initialState
    }
}


export default reducer
