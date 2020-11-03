import selectUserDomain from "./selectors";
import { RouteProps } from "react-router";
import {LazyExoticComponent} from "react";

export interface IProtectedRoute extends RouteProps {
    autoLoginAttempted: boolean;
    isAuthenticated: boolean;
    email?: string | undefined;
    profilePicture?: string | undefined;
    user?: any;
}

export interface IWithConnectProps {
    isAuthenticated: boolean;
    autoLoginAttempted: boolean;
}

export interface IUserProps {
    autoLoginAttempted: boolean;
    isAuthenticated: boolean;
    isLoading?: boolean;
    email?: undefined | string,
    profilePicture?: undefined | string;
    user?: any;
}
export interface IUser {
    user?: IUserProps;
}

export interface IAutoLoginAction {
    type: string;
    payload: IUserProps;
}

export type SelectorType = ReturnType<typeof selectUserDomain>;