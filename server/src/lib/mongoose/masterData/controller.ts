import ItemComponent from "./model"
import {
    W,
} from "../../winston"
import {
    NavigationItem,
    DeleteNavigationItemParams,
} from "./types";

class MasterDataDataBaseController {
    public static async fetchAllNavigationBarItems() {
        try {
            return await ItemComponent.find().sort({
                index: `ascending`
            })
        } catch (e) {
            W.error(`Error occurred while fetching all navigation bar items`)
            throw e
        }
    }
    public static async createNavigationBarItem({
        name,
        index,
    } : NavigationItem) {
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
            throw e
        }
    }
    public static async updateNavigationBarItem({
        name,
        index,
        id,
    } : NavigationItem) {
        try {
            const itemComponent = await ItemComponent.findById(id)
            if (itemComponent) {
                W.info(`Successfully updated item component ${itemComponent}`)
                await itemComponent.update({
                    name,
                    index,
                })
                return await ItemComponent.findById(id)

            }
        } catch (e) {
            W.error(`Error occurred while updating navigation bar item: ${e} `)
            throw e
        }
    }
    public static async deleteNavigationBarItem({
        id,
    }: DeleteNavigationItemParams) {
        try {
            const itemComponent = await ItemComponent.findById(id)
            if (itemComponent) itemComponent.deleteOne()
            W.info(`Successfully deleted ${itemComponent}`)
            return itemComponent
        } catch (e) {
            W.error(`Error occurred while deleteing naviation bar item: ${e}`)
            throw e
        }
    }
}

export default MasterDataDataBaseController

