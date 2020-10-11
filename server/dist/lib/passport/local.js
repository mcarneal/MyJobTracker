"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("../mongoose/users/model"));
const passport_1 = __importDefault(require("passport"));
const LocalStrategy = require("passport-local").Strategy;
passport_1.default.use(new LocalStrategy(function (username, password, done) {
    // find the user based off the username (case insensitive)
    model_1.default.findOne({
        displayName: username,
    }).select("+password").exec(function (err, user) {
        // if any problems, error out
        if (err) {
            return done(err, undefined, undefined);
        }
        if (!user) {
            return done(null, false, {
                message: "Unknown user: " + username
            });
        }
        const comparedPassword = user.toObject().password;
        // verify if the password is valid
        user.schema.methods.isPasswordValid(password, comparedPassword, function (err, isValid) {
            // if any problems, error out
            if (err) {
                return done(err, undefined, undefined);
            }
            // only return the user if the password is valid
            if (isValid) {
                return done(null, user, undefined);
            }
            else {
                return done(null, false, {
                    message: "Invalid password"
                });
            }
        });
    });
}));
