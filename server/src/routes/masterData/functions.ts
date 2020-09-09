import Boom from 'boom'
import {
    W,
} from "../../lib/winston"
import queryTimer from "../../lib/helpers/queryTimer"
import {
    Request,
    Response,
} from "express"

import MasterDataDataBaseController from "../../lib/mongoose/masterData"
const SUCCESS = 200

const fetchAllNavigationBarItems = async (req: Request, res: Response) => {
    try {
        queryTimer.processStarted()
        const allNavigationBarItems = await MasterDataDataBaseController.fetchAllNavigationBarItems()
        W.info(`successfully retrieved navigation bar items`)
        res.status(SUCCESS).json({
            result: {
                count: 4,
                queryTime: queryTimer.processFinished(),
                data: allNavigationBarItems,
            },
        })
    } catch (e) {
        W.error(e.message)
        res.status(e.status).json({
            result: Boom.badImplementation(e)
        })
    }
}

const createNavigationBarItem = async (req: Request, res: Response) => {
    try {
        queryTimer.processStarted()
        const {
            body,
        } = req
        const newNavigationBarItem = await MasterDataDataBaseController.createNavigationBarItem(body)
        W.info(`successfully retrieved navigation bar items`)
        res.status(SUCCESS).json({
            result: {
                count: 4,
                queryTime: queryTimer.processFinished(),
                data: newNavigationBarItem,
            },
        })
    } catch (e) {
        W.error(e.message)
        res.status(e.status).json({
            result: Boom.badImplementation(e)
        })
    }
}

export default {
    fetchAllNavigationBarItems,
    createNavigationBarItem,
}

