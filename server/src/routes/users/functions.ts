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
import UserController from "../../lib/mongoose/users";

const NO_RESULT_FOUND = 0
const RESULT_INDEX = 0
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

const createUser = async (req: Request, res: Response) => {
    try {
        queryTimer.processStarted()
        let count: number = NO_RESULT_FOUND
        const {
            body
        } = req
        if (body.displayName && body.password) {
            const {
                displayName,
                password,
            } = body
            const user = await UserController.createUser({
                displayName,
                password,
            })
            if (user) count = user.length

            res.status(SUCCESS).json({
                result: {
                    count,
                    queryTime: queryTimer.processFinished(),
                    data: user[RESULT_INDEX],
                }
            })
        }
    } catch (e) {
        W.error(e.message)
        res.status(e.status).json({
            result: Boom.badImplementation(e)
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        queryTimer.processStarted()
        const {
            body,
        } = req
        if (body.id) {
            const {
                id
            } = body
            const deletedUser = await UserController.deleteUser({
                id,
            })
            res.status(SUCCESS).json({
                result: {
                    queryTime: queryTimer.processFinished(),
                    data: deletedUser,
                }
            })
        }
    } catch (e) {
        W.error(e.message)
        res.status(404).json({
            result: Boom.badImplementation(e)
        })
    }
}

export default {
    fetchAllUsers,
    createUser,
    deleteUser,
}
