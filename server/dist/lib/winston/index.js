"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.W = void 0;
const winstonConsole_1 = __importDefault(require("./winstonConsole"));
const winston_1 = require("./winston");
const { CONSOLE_LOGS: level, SERVICE, } = process.env;
const { errors, } = winston_1.format;
const W = winston_1.createLogger({
    level,
    format: winston_1.format.combine(errors({
        stack: true,
    }), winston_1.format.label({
        label: SERVICE,
    }), winston_1.format.timestamp({
        format: `YYYY-MM-DD HH:mm:ss`,
    }), winston_1.format.json(), winston_1.format.prettyPrint()),
    transports: [
        winstonConsole_1.default,
    ],
});
exports.W = W;
W.on(`error`, (e) => {
    W.error(e);
});
