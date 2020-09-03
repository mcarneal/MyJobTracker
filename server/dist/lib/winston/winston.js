"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = exports.label = exports.timestamp = exports.combine = exports.transports = exports.createLogger = exports.loggingFormat = void 0;
const winston_1 = require("winston");
Object.defineProperty(exports, "createLogger", { enumerable: true, get: function () { return winston_1.createLogger; } });
Object.defineProperty(exports, "format", { enumerable: true, get: function () { return winston_1.format; } });
Object.defineProperty(exports, "transports", { enumerable: true, get: function () { return winston_1.transports; } });
const { NODE_ENV, } = process.env;
const { combine, timestamp, label, printf } = winston_1.format;
exports.combine = combine;
exports.timestamp = timestamp;
exports.label = label;
const NO_KEYS = 0;
const logger = (info) => {
    const { level, label, message, timestamp } = info, meta = __rest(info, ["level", "label", "message", "timestamp"]);
    const object = typeof (meta) === `object` && Object.keys(meta).length === NO_KEYS ? `` : JSON.stringify(meta);
    const msg = typeof (message) === `object` ? JSON.stringify(message) : message;
    return `${timestamp} ${level} [${label}](${NODE_ENV}): ${msg} ${object}`;
};
const loggingFormat = printf(logger);
exports.loggingFormat = loggingFormat;
