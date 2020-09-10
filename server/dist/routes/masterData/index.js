"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const functions_1 = __importDefault(require("./functions"));
const RESOURCE = `master-data`;
const ACCOUNT_PREFIX = `:accountId`;
module.exports = (api) => {
    api.get(`/${RESOURCE}/navigation-items`, [
    //todo: plug middleware in here
    ], functions_1.default.fetchAllNavigationBarItems);
    api.post(`/${RESOURCE}/navigation-items`, [
    //todo: plug middleware in here
    ], functions_1.default.createNavigationBarItem);
    api.patch(`/${RESOURCE}/navigation-items`, [
    //todo: plug middleware in here
    ], functions_1.default.updateNavigationBarItem);
    api.delete(`/${RESOURCE}/navigation-items`, [
    //todo: plug middleware in here
    ], functions_1.default.deleteNavigationBarItem);
};
