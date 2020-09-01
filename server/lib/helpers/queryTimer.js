const HR_IN_SECONDS = 0
const HR_IN_NANO_SECONDS = 1
const ONE_MILLION = 1000000


/**
 * Timer - simple timer with start and stop
 */
class QueryTimer {
    constructor () {
        this.start = null
        this.stop = null
    }
    processStarted () {
        this.start = process.hrtime()

    }
    processFinished () {
        this.stop = process.hrtime(this.start)
        return `${this.stop[HR_IN_SECONDS]}s ${this.stop[HR_IN_NANO_SECONDS]/ONE_MILLION}ms`

    }
}

module.exports = new QueryTimer()
