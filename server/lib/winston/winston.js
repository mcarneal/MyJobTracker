
const {
    NODE_ENV,
} = process.env

const NO_KEYS = 0
const {
    createLogger,
    format,
    transports,
} = require(`winston`)

const {
    combine,
    timestamp,
    label,
    printf,
} = format

const logger = (info) => {
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

module.exports = {
    loggingFormat,
    createLogger,
    transports,
    combine,
    timestamp,
    label,
    format,
}
