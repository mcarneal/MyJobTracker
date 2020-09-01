const Boom = require(`boom`)
const {
    W,
} = require(`../../lib/winston`)
const {
    queryTimer
} = require(`../../lib/helpers`)
const SUCCESS = 200
const User = require(`../../lib/mongoose/users/model`)


const fetchAllUsers = async (req, res, next) => {
    try {
        queryTimer.processStarted()
        const user = new User({
            userName: `12345`,
        })
        await user.save()
        res.status(SUCCESS).json({
            // query,
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
            // query,
            result: Boom.badImplementation(e),
        })
    }
}

module.exports = {
    fetchAllUsers,
}
