"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("./winston");
const { CONSOLE_LOGS, } = process.env;
const winstonConsole = new winston_1.transports.Console({
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.align(), winston_1.format.splat(), winston_1.format.json(), winston_1.format.simple(), winston_1.loggingFormat),
    level: CONSOLE_LOGS,
});
exports.default = winstonConsole;
