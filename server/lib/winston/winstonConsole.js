const {
    transports,
    format,
    loggingFormat,
} = require(`./winston`)
const {
    CONSOLE_LOGS,
} = process.env
const winstonConsole = new transports.Console({
    format: format.combine(
        format.colorize(),
        format.align(),
        format.splat(),
        format.json(),
        format.simple(),
        loggingFormat
    ),
    level: CONSOLE_LOGS,
})

module.exports = winstonConsole
