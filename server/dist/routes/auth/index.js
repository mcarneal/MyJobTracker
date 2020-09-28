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
const model_1 = __importDefault(require("../../lib/mongoose/users/model"));
const winston_1 = require("../../lib/winston");
const google_auth_library_1 = require("google-auth-library");
const RESOURCE = `auth`;
const ACCOUNT_PREFIX = `:accountId`;
// const BASE_PATH = `/${ACCOUNT_PREFIX}/${RESOURCE}`
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { CLIENTID, CLIENTSECERT, } = process.env;
const client = new google_auth_library_1.OAuth2Client(CLIENTID, CLIENTSECERT);
passport.use(new GoogleStrategy({
    clientID: CLIENTID,
    clientSecret: CLIENTSECERT,
    callbackURL: "/api/auth/google/redirect"
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
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
})));
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser((_id, done) => {
    model_1.default.findById(_id).then(user => {
        done(null, user);
    });
});
module.exports = (api) => {
    api.get("/auth/google", passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: 'consent',
        accessType: 'offline'
    }));
    api.get("/auth/google/redirect", passport.authenticate("google"), (req, res) => {
        res.redirect("http://localhost:3000");
    });
    api.get("/auth/refresh", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.user;
            if (user) {
                client.setCredentials({
                    refresh_token: user.refreshToken
                });
                client.refreshAccessToken((err, token) => __awaiter(void 0, void 0, void 0, function* () {
                    if (token) {
                        let accessToken = token.access_token;
                        let refreshToken = token.refresh_token;
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
    }));
};
