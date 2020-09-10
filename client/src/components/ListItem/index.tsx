import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import {
    ListItemProps,
    Components,
} from "./types";


const ListItems = ({ name, index } : ListItemProps ) => {
    const components: Components = {
        Home: HomeIcon,
        Jobs: WorkIcon ,
        Dashboard: DashboardIcon

    }
    const IconComponent = components[name]

    return (
        <ListItem  button key={name}>
            <ListItemIcon>
                <IconComponent />
            </ListItemIcon>
            <ListItemText
                primary={name}
            />
        </ListItem>
    )
}
export default ListItems