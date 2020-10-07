import axios from "axios"

class MasterDataApiController {
    private static baseUrl= process.env.REACT_APP_BASE_URL

    public static async fetchItems() {
        return (await axios.get(`${this.baseUrl}/master-data/navigation-items`, {
            withCredentials: true,
        })).data.result.data
    }
}

export default MasterDataApiController