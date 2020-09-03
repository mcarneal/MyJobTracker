import {
    transports,
    format,
    loggingFormat,
} from  './winston'
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

export default winstonConsole
