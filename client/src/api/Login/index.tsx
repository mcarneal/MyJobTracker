import axios from "axios"
import { ILogin } from "./types";

class LoginController {
    private static baseUrl= process.env.REACT_APP_BASE_URL

    public static async login({
        username,
        password,
    }: ILogin) {
        return (await axios.post(`${this.baseUrl}/auth/login`, {
            username,
            password,
        }, {
            withCredentials: true,
        })).data.result.data
    }
}

export default LoginController