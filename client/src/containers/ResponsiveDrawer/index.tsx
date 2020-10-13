import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import { ResponsiveDrawerProps, SelectorType } from "./types"
import { connect, useDispatch } from "react-redux";
import {FetchFromApi, useStyles } from "./hooks"
import * as selectors  from "./selectors"
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ListItems from "../../components/ListItem"
import {Button} from "@material-ui/core";
import { initiateLogout } from "../ProtectedRoute/actions";

const ResponsiveDrawer = ({
    children,
    window,
    isFetching,
    items,
}: ResponsiveDrawerProps)  => {

    FetchFromApi({
        isFetching
    })
    const dispatch = useDispatch()
    const classes = useStyles();
    const theme = useTheme();

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        dispatch(initiateLogout())
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const drawer = items && isFetching ? (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {items.map((item: {name: string, index: number}) => {
                    return (
                        <ListItems key={item.index} name={item.name} index={item.index} />
                    )
                })}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    ) : null;

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Responsive drawer
                    </Typography>
                        <Button
                            onClick={handleLogout}
                            color="secondary"
                            variant="contained"
                            className={classes.submit}
                        >
                            Logout
                        </Button>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                { children }
            </main>
        </div>
    );
}

const mapStateToProps = createStructuredSelector<ResponsiveDrawerProps, SelectorType>({
    items: selectors.makeViewIcons(),
    isFetching: selectors.makeIsFetching()
});

const withConnect = connect(
    mapStateToProps,
)

export default compose(
    withConnect,
)(ResponsiveDrawer)

