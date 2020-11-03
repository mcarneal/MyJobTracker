"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const passport_1 = __importDefault(require("../../lib/passport"));
const functions_1 = __importDefault(require("./functions"));
module.exports = (api) => {
    api.get("/auth/google", passport_1.default.authenticate("google", {
        scope: ["profile", "email"],
        prompt: 'consent',
        accessType: 'offline',
    }));
    api.get("/auth/google/redirect", passport_1.default.authenticate("google"), (req, res) => {
        res.redirect("http://localhost:3000/");
    });
    api.get("/auth/refresh", functions_1.default.handleGoogleRefreshToken);
    api.post("/auth/login", functions_1.default.handleLocalAuthentication);
    api.post("/auth/logout", functions_1.default.logout);
    api.post(`/auth/auto-login`, functions_1.default.autoLogin);
};
