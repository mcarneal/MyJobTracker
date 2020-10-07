"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const {
//     CLIENTID,
//     CLIENTSECERT,
// } = process.env
//
//
// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: CLIENTID,
//             clientSecret: CLIENTSECERT,
//             callbackURL: "/api/auth/google/redirect"
//         },
//         async (accessToken: string, refreshToken: any, profile: any, done: any) => {
//             try {
//                 let currentUser
//                 currentUser = await User.findOne({
//                     googleId: profile.id,
//                 })
//                 if (currentUser) {
//                     await currentUser.updateOne({
//                         accessToken,
//                         refreshToken,
//                     })
//                     await currentUser.save()
//                     done(null, currentUser)
//                 } else {
//                     currentUser = await User.create({
//                         googleId: profile.id,
//                         displayName: profile.displayName,
//                         accessToken,
//                         refreshToken,
//                     })
//                     currentUser.save()
//                     done(null, currentUser)
//                 }
//             } catch (e) {
//                 W.error(`Error occurred in auth: ${e}`)
//             }
//         }
//     )
// );
// passport.use(new LocalStrategy(function (username: string | RegExp, password: any, done: (arg0: NativeError | null | boolean, arg1: boolean | Document | undefined, arg2: { message: string; } | undefined) => void) {
//     // find the user based off the username (case insensitive)
//     User.findOne({
//         displayName: username,
//     }).select("+password").exec(function(err, user) {
//         // if any problems, error out
//         if (err) {
//             return done(err, undefined, undefined);
//         }
//         if (!user) {
//             return done(null, false, {
//                 message: "Unknown user: " + username
//             });
//         }
//
//         const comparedPassword = user.toObject().password
//         // verify if the password is valid
//         user.schema.methods.isPasswordValid(password, comparedPassword, function(err: boolean | NativeError | null, isValid: boolean) {
//             // if any problems, error out
//             if (err) {
//                 return done(err, undefined, undefined);
//             }
//
//             // only return the user if the password is valid
//             if (isValid) {
//                 return done(null, user, undefined);
//             } else {
//                 return done(null, false, {
//                     message: "Invalid password"
//                 });
//             }
//         });
//     });
// }));
// passport.serializeUser((user: { _id: any; }, done: (arg0: null, arg1: any) => void) => {
//     done(null, user._id);
// });
//
// passport.deserializeUser((_id: any, done: (arg0: null, arg1: Document | null) => void) => {
//     User.findById(_id).then(user => {
//         done(null, user);
//     });
// });
exports.default = passport;
