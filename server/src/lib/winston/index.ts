import winstonConsole from "./winstonConsole";
import {
    createLogger,
    format,
} from './winston'
const {
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

W.on(`error`,  (e: Error) => {
    W.error(e)
})

export {
    W,
}
