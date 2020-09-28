import Boom from 'boom'
import {
    W,
} from '../../lib/winston'
import queryTimer from "../../lib/helpers/queryTimer"
import User from '../../lib/mongoose/users/model'
import {
    Request,
    Response,
} from 'express';

const SUCCESS = 200

const fetchAllUsers = async (req: Request, res: Response) => {
    try {
        queryTimer.processStarted()
        const allUsers = await User.find()
        let count = allUsers.length
        res.status(SUCCESS).json({
            result: {
                count,
                queryTime: queryTimer.processFinished(),
                data: allUsers,
            },
        })
    }
    catch (e) {
        W.error(e.message)
        res.status(e.status).json({
            result: Boom.badImplementation(e),
        })
    }
}

export default {
    fetchAllUsers
}
