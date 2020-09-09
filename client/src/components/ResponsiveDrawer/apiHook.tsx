import { useState, useEffect, FunctionComponent } from "react"
import  { useDispatch} from "react-redux";
import { useInjectReducer, } from '../../utils/injectReducer';
import reducer from "./reducers";
import {fetchItemsIfNeeded} from "./actions";
import {ResponsiveDrawerProps} from "./types"

const FetchFromApi = (props: any) =>  {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    useInjectReducer ({
        key: "items",
        reducer,
    })

    useEffect(() => {
        const getData =  () => {
            try {
                dispatch(fetchItemsIfNeeded(props))
            } catch (e) {
                //todo add fail state
            }
        }
            getData()
    })
    return [loading, setLoading]
}

export default FetchFromApi
