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
        account: {
          position: 'relative',
          marginLeft: 'auto',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                // width: `calc(100% - ${drawerWidth}px)`,
                // marginLeft: drawerWidth,
                zIndex: theme.zIndex.drawer + 1,
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
        },
        large: {
            width: theme.spacing(9),
            height: theme.spacing(9),
            marginLeft: 70,
            display: "flex",
            alignItems: 'center'
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.primary,
        },
        menuItem: {
            width: 200,
        }
    }),
);