import { useEffect } from "react"
import { useDispatch} from "react-redux";
import { useInjectReducer, } from '../../utils/injectReducer';
import reducer from "./reducers";
import { fetchItems } from "./actions";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
const drawerWidth = 240;


export const FetchFromApi = ({
    isFetching
} : {
    isFetching: boolean | undefined
}) =>  {
    const dispatch = useDispatch()

    useInjectReducer ({
        key: "items",
        reducer,
    })
    useEffect(() => {
        if (!isFetching) {
            dispatch(fetchItems())
        }
    })
}

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        submit: {
                marginLeft: theme.spacing(160),
            [theme.breakpoints.down('md')]: {
                marginLeft: theme.spacing(5),
            },
        }
    }),
);