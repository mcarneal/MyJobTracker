"use strict";
const HR_IN_SECONDS = 0;
const HR_IN_NANO_SECONDS = 1;
const ONE_MILLION = 1000000;
/**
 * Timer - simple timer with start and stop
 */
class QueryTimer {
    constructor() {
        this.start = [0, 0];
        this.stop = [0, 0];
    }
    processStarted() {
        this.start = process.hrtime();
    }
    processFinished() {
        this.stop = process.hrtime(this.start);
        return `${this.stop[HR_IN_SECONDS]}s ${this.stop[HR_IN_NANO_SECONDS] / ONE_MILLION}ms`;
    }
}
const queryTimer = new QueryTimer();
module.exports = queryTimer;
