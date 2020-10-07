"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const functions_1 = __importDefault(require("./functions"));
const RESOURCE = `users`;
const ACCOUNT_PREFIX = `:accountId`;
module.exports = (api) => {
    api.get(`/${RESOURCE}/`, functions_1.default.fetchAllUsers);
    api.post(`/${RESOURCE}`, functions_1.default.createUser);
    api.delete(`/${RESOURCE}`, functions_1.default.deleteUser);
};
