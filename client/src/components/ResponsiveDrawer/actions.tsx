// import {ADD_FORECAST} from "./constants"
// import {
//     Message,
//     SendMessageAction
// } from "./types";
import axios from "axios"

export const fetchItemsIfNeeded = (state: any) => {
    return (dispatch: (arg0: (dispatch: any) => Promise<void>) => any) => {
        if(shouldFetchItems(state)) {
            return dispatch(fetchItems())
        }
    }
}
const shouldFetchItems = (state: any) => {
     return !state.isFetching;
}

const fetchItemData = async () => {
    return (await axios.get(`http://localhost:8808/api/master-data/navigation-items`)).data.result.data
}


interface PayloadItem {
    id: string
    index: number
    name: string
    __v: number
}
interface PayloadItems extends Array<PayloadItem>{}

const fetchItems = () => {
    return async (dispatch: any)  => {
        try {
            const items = await fetchItemData()
            dispatch(getDataSuccess({
                items,
                isFetching: true,
            }))
        } catch (e) {
            dispatch(getDataFailure({
                isFetching: true,
            }))
        }
    };
};

export const getDataSuccess = (payload: any) => ({
    type: `FETCH_SUCCESS`,
    payload
});


 const getDataFailure = (payload: any) => ({
    type: `FETCH_FAILED`,
     payload
});
