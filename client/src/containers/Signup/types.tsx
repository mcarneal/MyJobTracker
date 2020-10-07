export interface CreateUser {
    isLoading: boolean,
    email: string | undefined,
}

export interface CreateUserAction {
    type: string,
    payload: CreateUser
}

export interface SignupProps {
    email: string
    password: string
}
