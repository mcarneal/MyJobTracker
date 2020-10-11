import {Document, NativeError} from "mongoose";
import User from "../../mongoose/users/model";

export default async function initializeLocalConfig (username: string | RegExp, password: any, done: (arg0: NativeError | null | boolean, arg1: boolean | Document | undefined, arg2: { message: string; } | undefined) => void) {
   await User.findOne({
        displayName: username,
    }).select("+password").exec(function(err, user) {
        if (err) return done(err, undefined, undefined);

        if (!user) return done(null, false, {
                message: "Unknown user: " + username
            });

        const comparedPassword = user.toObject().password
        user.schema.methods.isPasswordValid(password, comparedPassword, function(err: boolean | NativeError | null, isValid: boolean) {
            if (err) return done(err, undefined, undefined);

            if (isValid) return done(null, user, undefined);

                return done(null, false, {
                    message: "Invalid password"
                });
        });
    });
}