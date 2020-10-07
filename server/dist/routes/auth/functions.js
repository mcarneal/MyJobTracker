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
const passport_1 = __importDefault(require("../../lib/passport"));
const model_1 = __importDefault(require("../../lib/mongoose/users/model"));
const winston_1 = require("../../lib/winston");
const google_auth_library_1 = require("google-auth-library");
const { CLIENTID, CLIENTSECERT, } = process.env;
const handleLocalAuthentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("local", function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(500).json(info.message);
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.status(201).json(user);
        });
    })(req, res, next);
});
const handleGoogleRefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = new google_auth_library_1.OAuth2Client(CLIENTID, CLIENTSECERT);
        const user = req.user;
        if (user) {
            client.setCredentials({
                refresh_token: user.refreshToken
            });
            client.refreshAccessToken((err, token) => __awaiter(void 0, void 0, void 0, function* () {
                if (token) {
                    const accessToken = token.access_token;
                    const refreshToken = token.refresh_token;
                    const currentUser = yield model_1.default.findOne({
                        googleId: user.googleId
                    });
                    if (currentUser) {
                        yield currentUser.updateOne({
                            accessToken,
                            refreshToken,
                        });
                        yield currentUser.save();
                        req.user = currentUser;
                        res.json(currentUser);
                    }
                }
            }));
        }
    }
    catch (e) {
        winston_1.W.error(`Error occurred from auth refresh ${e}`);
    }
});
exports.default = {
    handleGoogleRefreshToken,
    handleLocalAuthentication,
};
