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
const model_1 = __importDefault(require("../../lib/mongoose/users/model"));
const users_1 = __importDefault(require("../../lib/mongoose/users"));
const NO_RESULT_FOUND = 0;
const RESULT_INDEX = 0;
const SUCCESS = 200;
const fetchAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        queryTimer_1.default.processStarted();
        const allUsers = yield model_1.default.find();
        let count = allUsers.length;
        res.status(SUCCESS).json({
            result: {
                count,
                queryTime: queryTimer_1.default.processFinished(),
                data: allUsers,
            },
        });
    }
    catch (e) {
        winston_1.W.error(e.message);
        res.status(e.status).json({
            result: boom_1.default.badImplementation(e),
        });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        queryTimer_1.default.processStarted();
        let count = NO_RESULT_FOUND;
        const { body } = req;
        if (body.displayName && body.password) {
            const { displayName, password, } = body;
            const user = yield users_1.default.createUser({
                displayName,
                password,
            });
            if (user)
                count = user.length;
            res.status(SUCCESS).json({
                result: {
                    count,
                    queryTime: queryTimer_1.default.processFinished(),
                    data: user[RESULT_INDEX],
                }
            });
        }
    }
    catch (e) {
        winston_1.W.error(e.message);
        res.status(e.status).json({
            result: boom_1.default.badImplementation(e)
        });
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        queryTimer_1.default.processStarted();
        const { body, } = req;
        if (body.id) {
            const { id } = body;
            const deletedUser = yield users_1.default.deleteUser({
                id,
            });
            res.status(SUCCESS).json({
                result: {
                    queryTime: queryTimer_1.default.processFinished(),
                    data: deletedUser,
                }
            });
        }
    }
    catch (e) {
        winston_1.W.error(e.message);
        res.status(404).json({
            result: boom_1.default.badImplementation(e)
        });
    }
});
exports.default = {
    fetchAllUsers,
    createUser,
    deleteUser,
};
