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
const model_1 = __importDefault(require("./model"));
const winston_1 = require("../../winston");
const customErrors_1 = __importDefault(require("../../customErrors"));
class UserController {
    static createUser({ displayName, password, profilePicture = null, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield model_1.default.create({
                    displayName,
                    password,
                    profilePicture,
                });
                yield user.save();
                return [user];
            }
            catch (e) {
                winston_1.W.error(`$Error occurred while creating a user ${e}`);
                throw e;
            }
        });
    }
    static deleteUser({ id, }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield model_1.default.findById(id);
                if (user) {
                    user.deleteOne();
                    return user;
                }
                else {
                    return new customErrors_1.default.NoUserFoundError({
                        message: `No user found`
                    });
                }
            }
            catch (e) {
                winston_1.W.error(`Error occurred while attempting to delete user ${e}`);
            }
        });
    }
}
exports.default = UserController;
