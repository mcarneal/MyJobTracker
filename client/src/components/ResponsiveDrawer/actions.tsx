import MasterDataApiController from "../../api/Master-Data";
import {
    FETCH_FAILED,
    FETCH_SUCCESS
} from "./constants"
import {
    Item,
} from "./types";

export const fetchItems = () => {
    return async (dispatch: any)  => {
        try {
            const items = await MasterDataApiController.fetchItems()
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


export const getDataSuccess = (payload: Item) => ({
    type: FETCH_SUCCESS,
    payload
});

 const getDataFailure = (payload: Item) => ({
    type: FETCH_FAILED,
     payload
});
