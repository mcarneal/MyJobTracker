import React, {FunctionComponent, lazy, ReactComponentElement, useEffect} from 'react';
import { connect, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Route, Switch, Redirect, RouteProps } from "react-router";
import {createStructuredSelector} from 'reselect';
import {useInjectReducer} from '../../utils/injectReducer';
import { initiateAutoLogin } from "./actions";
import reducer from "./reducers";
import * as selectors from "./selectors";
import {
    SelectorType,
    IProtectedRoute,
    IWithConnectProps,
} from "./types"



const ProtectedRoute: FunctionComponent<IProtectedRoute> = ({autoLoginAttempted ,isAuthenticated, component: Component, ...rest}) => {
    const dispatch = useDispatch()
    useInjectReducer ({
        key: "user",
        reducer,
    })
    useEffect(()=>{
      if (!autoLoginAttempted) {
          dispatch(initiateAutoLogin())
      }
    })
    return (
        autoLoginAttempted && Component ? <Route {...rest} render={(props: any) => (
            isAuthenticated
                ? <Component {...props} />
                : <Redirect to="/" />
        )} />
        : <h1>loading</h1>
        )

}

const mapStateToProps = createStructuredSelector<any, SelectorType>({
    isAuthenticated: selectors.makeIsAuthenticated(),
    autoLoginAttempted: selectors.makeAutoLoginAttempted()
});

const withConnect = connect<{}, {}, IWithConnectProps>(
    mapStateToProps,
)

export default compose(
    withConnect,
)(ProtectedRoute);