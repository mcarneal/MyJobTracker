import selectUserDomain from "./selectors";
import { RouteProps } from "react-router";

export interface IProtectedRoute extends RouteProps {
    autoLoginAttempted: boolean;
    isAuthenticated: boolean;
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
}
export interface IUser {
    user: IUserProps;
}

export interface IAutoLoginAction {
    type: string;
    payload: IUserProps;
}

export type SelectorType = ReturnType<typeof selectUserDomain>;