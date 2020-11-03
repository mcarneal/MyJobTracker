import {
    Router,
} from 'express';
import {Request, Response,} from "express";
import passport from "../../lib/passport";
import functions from './functions'

export = (api: Router) => {
    api.get("/auth/google", passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: 'consent',
        accessType: 'offline',
    }));
    api.get("/auth/google/redirect",passport.authenticate("google"),(req: Request, res: Response) =>{
        res.redirect("http://localhost:3000/")
    });
    api.get("/auth/refresh", functions.handleGoogleRefreshToken);
    api.post("/auth/login", functions.handleLocalAuthentication);
    api.post("/auth/logout", functions.logout)
    api.post(`/auth/auto-login`,functions.autoLogin)
}

