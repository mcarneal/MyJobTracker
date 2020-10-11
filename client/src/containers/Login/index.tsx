import React, { ComponentType, FunctionComponent } from 'react';
import { connect, useDispatch } from "react-redux";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { formValueSelector, Field, reduxForm, InjectedFormProps } from 'redux-form'
import TextFieldInput from "../../components/TextField";
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { LoginProps } from "./types";
import {Container, Paper, Avatar, Grid, CssBaseline, Typography, Button, Link, Box} from "@material-ui/core";
import GoogleButton from 'react-google-button'
import {useInjectReducer} from "../../utils/injectReducer";
import reducer from "./reducers";
import { submitUserLogin} from "./actions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '100%',
            },
        },
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        box: {
            margin: theme.spacing(8,0,2),
            alignItems: 'center',
            justifyContent: "center",
            display: 'flex',
        }
    }),
);



const Login: FunctionComponent<LoginProps & InjectedFormProps<{}, LoginProps>> = ({
    handleSubmit,
    email,
    password,

}) => {
    useInjectReducer ({
        key: "user",
        reducer,
    })
    const classes = useStyles();
    const dispatch = useDispatch()
    const submit = () => {
        dispatch(submitUserLogin({
            email,
            password,
        }))
    }
    return(
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>

                    </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                    <form
                        className={classes.form}
                        onSubmit={handleSubmit(submit)}
                    >
                        <div>
                            <Field
                                name="email"
                                id="outlined-basic"
                                placeholder="Email Address"
                                variant="outlined"
                                component={TextFieldInput}
                            />
                        </div>
                        <div>
                            <Field
                                name="password"
                                id="standard-password-input"
                                placeholder="Password"
                                type="password"
                                variant="outlined"
                                component={TextFieldInput}
                            />
                        </div>
                        <div>
                            <Button
                                type="submit"
                                color="primary"
                                fullWidth
                                variant="contained"
                                className={classes.submit}
                            >
                                Submit
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="http://localhost:3000/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                    <Box className={classes.box}
                     justifyContent="center"
                    >
                        <a href="http://localhost:8808/api/auth/google">
                             <GoogleButton
                                type="light"
                            />
                        </a>
                    </Box>
                </div>
        </Container>
    )
}

const selector = formValueSelector('LoginForm');
const mapStateToProps = createStructuredSelector({
    email: (state: any) => selector(state, 'email'),
    password: (state: any) => selector(state, 'password')
});

const withConnect = connect(
    mapStateToProps,
)

export default compose<ComponentType>(
    reduxForm({
        destroyOnUnmount: false,
        enableReinitialize: true,
        keepDirtyOnReinitialize: true,
        form: 'LoginForm'
    }),
    withConnect
)(Login);