import mongoose from "../client";

export interface ICreateUser {
    displayName: string
    password: string
}

export interface IDeleteUser {
    id: string,
}

export interface IUserSchema extends mongoose.Document {
    id: string,
    displayName: string,
    password: string,
    googleId: string,
    accessToken: string,
    refreshToken: string,
}