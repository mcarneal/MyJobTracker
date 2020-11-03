import React, {useState, FunctionComponent, useEffect} from 'react';
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
import { connect, useDispatch, useSelector } from "react-redux";
import {FetchFromApi, useStyles } from "./hooks"
import * as selectors  from "./selectors"
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import ListItems from "../../components/ListItem"
import {Box, Button, Grid, Menu, MenuItem, Paper} from "@material-ui/core";
import { initiateLogout } from "../ProtectedRoute/actions";
import * as userSelectors from "../ProtectedRoute/selectors"
import {AccountCircle} from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";

const ResponsiveDrawer : FunctionComponent<ResponsiveDrawerProps> = ({
    children,
    window,
    isFetching,
    items,
    isAuthenticated,
    user,
})  => {
    FetchFromApi({
        isFetching
    })
    const theme = useTheme();
    const dispatch = useDispatch()
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(initiateLogout())
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const drawer = items && isFetching ? (
        <div>
            <Hidden smUp implementation="css">
            <Grid container
                  className={classes.paper}
                  alignItems="center"
                  spacing={1}>
                <Grid item xs={12}>
                    <Typography
                        variant="h5">
                        <Box fontWeight="fontWeightBold" m={1}>
                            myJobTracker
                        </Box>
                    </Typography>
                    </Grid>
            </Grid>
            </Hidden>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                >
                    <Grid container
                          alignItems="center"
                          spacing={1}>
                        <Grid item xs={12}>
                    <Avatar src={user.profilePicture} className={classes.large}>
                        {/*<Box fontWeight="fontWeightBold" m={1}>*/}
                        {/*    M*/}
                        {/*</Box>*/}
                    </Avatar>
                        </Grid>
                        <Grid item xs={12}>
                    <Typography
                        variant="subtitle2">
                            <Box fontWeight="fontWeightBold" m={1}>
                                {user.email}
                            </Box>
                    </Typography>
                        </Grid>
                    </Grid>
                </IconButton>

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
      isAuthenticated ?
          <div className={classes.root}>
            {/*<CssBaseline />*/}
            <AppBar position="absolute" className={classes.appBar}>
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
                    <Hidden xsDown implementation="css">
                    <Typography variant="h6" noWrap>
                        myJobTracker
                    </Typography>
                    </Hidden>
                    <div className={classes.account}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <Avatar src={user.profilePicture}>
                                {/*<Box fontWeight="fontWeightBold" m={1}>*/}
                                {/*    M*/}
                                {/*</Box>*/}
                            </Avatar>
                            <Hidden xsDown implementation="css">
                            <Typography variant="subtitle2">
                                    <Box fontWeight="fontWeightBold" m={1}>
                                        {user.email}
                                    </Box>
                            </Typography>
                            </Hidden>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem className={classes.menuItem} onClick={handleClose}>Profile</MenuItem>
                            <MenuItem className={classes.menuItem} onClick={handleClose}>My account</MenuItem>
                            <MenuItem className={classes.menuItem} onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </div>
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
                        <div className={classes.toolbar} />

                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                { children }
            </main>
        </div>
          :
          <main className={classes.content}>
              <div className={classes.toolbar} />
              { children }
          </main>

    );
}

const mapStateToProps = createStructuredSelector<ResponsiveDrawerProps, SelectorType>({
    items: selectors.makeViewIcons(),
    isFetching: selectors.makeIsFetching(),
    isAuthenticated: userSelectors.makeIsAuthenticated(),
    user: userSelectors.makeUser(),
});

const withConnect = connect(
    mapStateToProps,
)

export default compose(
    withConnect,
)(ResponsiveDrawer)

