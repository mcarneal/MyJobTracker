import {ADD_FORECAST} from "./constants"
import {
    Message,
    SendMessageAction
} from "./types";

export const sendMessage = (payload: Message) : SendMessageAction => {
    return {
        type: ADD_FORECAST,
        payload,
    }
}


