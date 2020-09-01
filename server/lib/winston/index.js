
const winstonConsole = require(`./winstonConsole`)

const {
    createLogger,
    format,
} = require(`./winston`)
const {
    NODE_ENV,
    CONSOLE_LOGS: level,
    SERVICE,
} = process.env
const {
    errors,
} = format

const W = createLogger({
    level,
    format: format.combine(
        errors({
            stack: true,
        }),
        format.label({
            label: SERVICE,
        }),
        format.timestamp({
            format: `YYYY-MM-DD HH:mm:ss`,
        }),
        format.json(),
        format.prettyPrint()
    ),
    transports: [
        winstonConsole,
    ],
})

W.on(`error`,  (e) => {
    W.error(e)
})
module.exports = {
    W,
}
