import {
    Router,
} from 'express';
import User from "../../lib/mongoose/users/model"
import {W} from "../../lib/winston";
import { Document } from 'mongoose';
import {Request, Response,} from "express"
import { OAuth2Client } from "google-auth-library"


const RESOURCE = `auth`
const ACCOUNT_PREFIX = `:accountId`
// const BASE_PATH = `/${ACCOUNT_PREFIX}/${RESOURCE}`

const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {
    CLIENTID,
    CLIENTSECERT,
} = process.env

const client = new OAuth2Client(
    CLIENTID,
    CLIENTSECERT
);


passport.use(
    new GoogleStrategy(
        {
            clientID: CLIENTID,
            clientSecret: CLIENTSECERT,
            callbackURL: "/api/auth/google/redirect"
        },
        async (accessToken: string, refreshToken: any, profile: any, done: any) => {
            try {
                let currentUser
                currentUser = await User.findOne({
                    googleId: profile.id,
                })
                if (currentUser) {
                    await currentUser.updateOne({
                        accessToken,
                        refreshToken,
                    })
                    await currentUser.save()
                    done(null, currentUser)
                } else {
                    currentUser = await User.create({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        accessToken,
                        refreshToken,
                    })
                    currentUser.save()
                    done(null, currentUser)
                }
            } catch (e) {
                W.error(`Error occurred in auth: ${e}`)
            }
        }
    )
);
passport.serializeUser((user: { _id: any; }, done: (arg0: null, arg1: any) => void) => {
    done(null, user._id);
});

passport.deserializeUser((_id: any, done: (arg0: null, arg1: Document | null) => void) => {
    User.findById(_id).then(user => {
        done(null, user);
    });
});

export = (api: Router) => {
    api.get("/auth/google", passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: 'consent',
        accessType: 'offline'
    }));

    api.get("/auth/google/redirect",passport.authenticate("google"),(req: Request, res: Response) =>{
        res.redirect("http://localhost:3000")
    });

    api.get("/auth/refresh", async (req: Request, res: Response) => {
        try {
            const user: any = req.user
            if (user) {
                client.setCredentials({
                    refresh_token: user.refreshToken
                });
                client.refreshAccessToken( async (err, token) => {
                    if (token) {
                        let accessToken = token.access_token
                        let refreshToken = token.refresh_token
                        const currentUser = await User.findOne({
                            googleId: user.googleId
                        })
                        if (currentUser){
                            await currentUser.updateOne({
                                accessToken,
                                refreshToken,
                            })
                            await currentUser.save()
                            req.user = currentUser
                            res.json(currentUser)
                        }
                    }
                })
            }
        } catch (e) {
            W.error(`Error occurred from auth refresh ${e}`)
        }
    })
}

