import Boom from 'boom'
import {
    W,
} from '../../lib/winston'
import queryTimer from "../../lib/helpers/queryTimer"
import User from '../../lib/mongoose/users/model'
import {
    Request,
    Response,
    NextFunction,
} from 'express';

const SUCCESS = 200

const fetchAllUsers = async (req: Request, res: Response, next : NextFunction) => {
    try {
        queryTimer.processStarted()
        const user = new User({
            userName: `megan`,
        })
        await user.save()
        W.info(`successfully created new user ${user}`)
        res.status(SUCCESS).json({
            result: {
                count: 1,
                queryTime: queryTimer.processFinished(),
                data: user,
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
