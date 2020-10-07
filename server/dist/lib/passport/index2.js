"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const config_1 = __importDefault(require("./local/config"));
const model_1 = __importDefault(require("../mongoose/users/model"));
const config_2 = require("./google/config");
passport_1.default.use('local', new LocalStrategy(config_1.default));
passport_1.default.use(new GoogleStrategy(config_2.config, config_2.initializeGoogleConfig));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser((_id, done) => {
    model_1.default.findById(_id).then(user => {
        done(null, user);
    });
});
exports.default = passport_1.default;
