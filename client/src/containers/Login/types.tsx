export interface LoginProps {
    email: string
    password: string
}

export interface IUserLogin {
    email: string| undefined;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface IUserLoginAction {
    type: string;
    payload: IUserLogin;
}
export interface ISubmitUserLogin {
    email: string;
    password: string;
}

export interface IUserLoginSuccessPayload {
    email: string;
    isAuthenticated: boolean;
    isLoading: boolean;
}