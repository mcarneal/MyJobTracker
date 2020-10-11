import axios from "axios"
import { ICreateUser } from "./types"

class SignupUserController {
    private static baseUrl= process.env.REACT_APP_BASE_URL

    public static async createUser({
        email,
        password,
    }: ICreateUser) {
        return (await axios.post(`${this.baseUrl}/users`, {
            displayName: email,
            password,
        }, {
            withCredentials: true,
        })).data.result.data
    }
}

export default SignupUserController