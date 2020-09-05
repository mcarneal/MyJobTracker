import {ADD_FORECAST} from "./constants";

export interface Message {
    name: string,
    age: number,
}

export interface SendMessageAction {
    type: typeof ADD_FORECAST
    payload: Message
}

export interface IApp {
    title: string
}
