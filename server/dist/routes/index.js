"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api = express_1.default.Router();
const routes = [
    `users`,
    `masterData`,
];
routes.forEach(route => require(`./${route}`)(api));
exports.default = api;
