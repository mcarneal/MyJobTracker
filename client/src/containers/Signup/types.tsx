export interface CreateUser {
    isLoading: boolean,
    email: string | undefined,
    isAuthenticated: boolean;
}

export interface CreateUserAction {
    type: string,
    payload: CreateUser
}

export interface SignupProps {
    email: string
    password: string
}
