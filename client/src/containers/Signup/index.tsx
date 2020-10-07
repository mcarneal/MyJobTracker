import React, { ComponentType , FunctionComponent } from 'react';
import { connect, useDispatch, } from "react-redux";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { formValueSelector, Field, reduxForm, InjectedFormProps } from 'redux-form'
import TextFieldInput from "../../components/TextField";
import { push } from "connected-react-router";
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from "../../utils/injectReducer";
import reducer from "./reducers";
import { submitCreateUser } from "./actions"
import { SignupProps } from "./types";

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

const Signup: FunctionComponent<SignupProps & InjectedFormProps<{}, SignupProps>> = ({
    handleSubmit,
    email,
    password,
}) => {
    useInjectReducer ({
        key: "user",
        reducer,
    })
    const dispatch = useDispatch()
    const handleBackButton = () => {
        dispatch(push(`/`))
    }
    const classes = useStyles();
    const submit = () => {
        dispatch(submitCreateUser({
            email,
            password,
        }))
    }
    return (
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
                    submit
                </button>
                <button onClick={handleBackButton}>
                    back
                </button>
            </div>
        </form>
    )
}

const selector = formValueSelector('SignupForm');
const mapStateToProps = createStructuredSelector({
    email: (state: any) => selector(state, 'email'),
    password: (state: any) => selector(state, 'password')
});

const withConnect = connect(
    mapStateToProps,
)

export default compose<ComponentType>(
    reduxForm({
        form: 'SignupForm'
    }),
    withConnect
)(Signup);