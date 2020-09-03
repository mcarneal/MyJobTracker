import {
    createLogger,
    format,
    transports,
} from 'winston'
const {
    NODE_ENV,
} = process.env
const {
    combine,
    timestamp,
    label,
    printf
} = format
const NO_KEYS = 0

const logger = (info: any) => {
    const {
        level,
        label,
        message,
        timestamp,
        ...meta
    } = info

    const object = typeof(meta) === `object` && Object.keys(meta).length  === NO_KEYS ?  `` : JSON.stringify(meta)
    const msg = typeof (message) === `object` ? JSON.stringify(message) : message

    return `${timestamp} ${level} [${label}](${NODE_ENV}): ${msg} ${object}`

}
const loggingFormat = printf(logger)

export {
    loggingFormat,
    createLogger,
    transports,
    combine,
    timestamp,
    label,
    format,
}
