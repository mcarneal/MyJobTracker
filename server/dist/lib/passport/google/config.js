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
exports.initializeGoogleConfig = exports.config = void 0;
const model_1 = __importDefault(require("../../mongoose/users/model"));
const winston_1 = require("../../winston");
const { CLIENTID, CLIENTSECERT, } = process.env;
exports.config = {
    clientID: CLIENTID,
    clientSecret: CLIENTSECERT,
    callbackURL: "/api/auth/google/redirect"
};
exports.initializeGoogleConfig = (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let currentUser;
        currentUser = yield model_1.default.findOne({
            googleId: profile.id,
        });
        if (currentUser) {
            yield currentUser.updateOne({
                accessToken,
                refreshToken,
            });
            yield currentUser.save();
            done(null, currentUser);
        }
        else {
            currentUser = yield model_1.default.create({
                googleId: profile.id,
                displayName: profile.displayName,
                accessToken,
                refreshToken,
            });
            currentUser.save();
            done(null, currentUser);
        }
    }
    catch (e) {
        winston_1.W.error(`Error occurred in auth: ${e}`);
    }
});
