"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const boom_1 = __importDefault(require("boom"));
const winston_1 = require("../../lib/winston");
const queryTimer_1 = __importDefault(require("../../lib/helpers/queryTimer"));
const masterData_1 = __importDefault(require("../../lib/mongoose/masterData"));
const SUCCESS = 200;
const fetchAllNavigationBarItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let count = 0;
        queryTimer_1.default.processStarted();
        const allNavigationBarItems = yield masterData_1.default.fetchAllNavigationBarItems();
        if (allNavigationBarItems) {
            count = allNavigationBarItems.length;
        }
        winston_1.W.info(`successfully retrieved ${count} navigation bar items`);
        res.status(SUCCESS).json({
            result: {
                count,
                queryTime: queryTimer_1.default.processFinished(),
                data: allNavigationBarItems,
            },
        });
    }
    catch (e) {
        winston_1.W.error(e.message);
        res.status(e.status).json({
            result: boom_1.default.badImplementation(e)
        });
    }
});
const createNavigationBarItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        queryTimer_1.default.processStarted();
        const { body, } = req;
        const newNavigationBarItem = yield masterData_1.default.createNavigationBarItem(body);
        winston_1.W.info(`successfully retrieved navigation bar items`);
        res.status(SUCCESS).json({
            result: {
                count: 4,
                queryTime: queryTimer_1.default.processFinished(),
                data: newNavigationBarItem,
            },
        });
    }
    catch (e) {
        winston_1.W.error(e.message);
        res.status(e.status).json({
            result: boom_1.default.badImplementation(e)
        });
    }
});
exports.default = {
    fetchAllNavigationBarItems,
    createNavigationBarItem,
};
