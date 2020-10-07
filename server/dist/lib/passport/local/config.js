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
const model_1 = __importDefault(require("../../mongoose/users/model"));
function initializeLocalConfig(username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        yield model_1.default.findOne({
            displayName: username,
        }).select("+password").exec(function (err, user) {
            if (err)
                return done(err, undefined, undefined);
            if (!user)
                return done(null, false, {
                    message: "Unknown user: " + username
                });
            const comparedPassword = user.toObject().password;
            user.schema.methods.isPasswordValid(password, comparedPassword, function (err, isValid) {
                if (err)
                    return done(err, undefined, undefined);
                if (isValid)
                    return done(null, user, undefined);
                return done(null, false, {
                    message: "Invalid password"
                });
            });
        });
    });
}
exports.default = initializeLocalConfig;
