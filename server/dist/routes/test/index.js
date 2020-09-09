"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const functions_1 = __importDefault(require("./functions"));
const RESOURCE = `test`;
const ACCOUNT_PREFIX = `:accountId`;
module.exports = (api) => {
    api.get(`/${RESOURCE}/`, functions_1.default.fetchAllNavigationBarItems);
};
