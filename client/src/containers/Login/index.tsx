import React, { ComponentType, FunctionComponent } from 'react';
import { connect } from "react-redux";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { formValueSelector, Field, reduxForm, InjectedFormProps } from 'redux-form'
import TextFieldInput from "../../components/TextField";
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { LoginProps } from "./types";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

const Login: FunctionComponent<LoginProps & InjectedFormProps<{}, LoginProps>> = ({handleSubmit, email, password}) => {
    const classes = useStyles();
    const submit = (e: any) => {
        console.log(e)
        console.log(email, password)
    }
    return(
        <form
            className={classes.root}
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
                <button type="submit">
                    Submit
                </button>
            </div>
        </form>
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