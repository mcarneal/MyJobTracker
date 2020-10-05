import React, {useEffect, FunctionComponent} from 'react';
import { useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import TextFieldInput from "../../components/TextField";

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

const Login: FunctionComponent<InjectedFormProps> = ({ handleSubmit, pristine, reset, submitting }) => {
    const classes = useStyles();
    const selector = useSelector(state => state)
    const submit = (e: any) => {
        console.log(e)
        console.log(selector)
    }
    return(
        <form
            className={classes.root}
            onSubmit={handleSubmit(submit)}
        >
            <div>
                <Field
                    name="Email"
                    id="outlined-basic"
                    placeholder="Email Address"
                    variant="outlined"
                    component={TextFieldInput}
                />
            </div>
            <div>
                <Field
                    name="Password"
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
export default reduxForm({
    form: "LoginForm"
})(Login)