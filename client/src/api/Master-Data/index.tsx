import axios from "axios"

class MasterDataApiController {
    private static baseUrl= process.env.REACT_APP_BASE_URL

    public static async fetchItems() {
        return (await axios.get(`${this.baseUrl}/master-data/navigation-items`, {
            withCredentials: true,
        })).data.result.data
    }
    // public static async fetchItems() {
    //     console.log(await axios.get(`${this.baseUrl}/auth/refresh`, {
    //         withCredentials: true,
    //     }))
    // }
}

export default MasterDataApiController