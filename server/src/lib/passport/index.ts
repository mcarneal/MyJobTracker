import passport from "passport";
const LocalStrategy = require("passport-local").Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import initializeLocalConfig from "./local/config";
import {Document} from "mongoose";
import User from "../mongoose/users/model";
import {
    config,
    initializeGoogleConfig,
} from "./google/config";


passport.use("local",new LocalStrategy(initializeLocalConfig))
passport.use("google",new GoogleStrategy(config, initializeGoogleConfig))



passport.serializeUser((user: { _id: any; }, done: (arg0: null, arg1: any) => void) => {
    done(null, user._id);
});

passport.deserializeUser((_id: any, done: (arg0: null, arg1: Document | null) => void) => {
    User.findById(_id).then(user => {
        done(null, user);
    });
});

export default passport