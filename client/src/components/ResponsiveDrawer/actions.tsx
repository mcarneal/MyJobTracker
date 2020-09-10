import axios from "axios"
import {
    FETCH_FAILED,
    FETCH_SUCCESS
} from "./constants"

import MasterDataApiController from "../../api/Master-Data";

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

export const getDataSuccess = (payload: any) => ({
    type: FETCH_SUCCESS,
    payload
});

 const getDataFailure = (payload: any) => ({
    type: FETCH_FAILED,
     payload
});
