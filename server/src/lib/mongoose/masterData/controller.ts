import ItemComponent from "./model"
import User from "../users/model";
import {
    W,
} from "../../winston"

interface CreateNavigationItem {
    name: string,
    index: number,
}
class MasterDataDataBaseController {
    public static async fetchAllNavigationBarItems() {
        try {
            return await ItemComponent.find()
        } catch (e) {
            W.error(`Error occurred while fetching all navigation bar items`)
        }
    }
    public static async createNavigationBarItem({
        name,
        index,
    } : CreateNavigationItem) {
        try {
            const itemComponent = new ItemComponent({
                name,
                index,
            })
            await itemComponent.save()
            W.info(`New Items component created: ${itemComponent}`)
            return itemComponent
        } catch (e) {
            W.error(`There was an error creating a Item Component: ${e}`)
        }
    }
}

export default MasterDataDataBaseController

