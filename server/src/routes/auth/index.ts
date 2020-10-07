import {
    Router,
} from 'express';
import {Request, Response,} from "express"
import passport from "../../lib/passport";
import functions from './functions'

export = (api: Router) => {
    api.get("/auth/google", passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: 'consent',
        accessType: 'offline',
    }));
    api.get("/auth/google/redirect",passport.authenticate("google"),(req: Request, res: Response) =>{
        res.redirect("http://localhost:3000")
    });
    api.get("/auth/refresh", functions.handleGoogleRefreshToken)
    api.post("/auth/login", functions.handleLocalAuthentication);

    // api.get("/logout", function(req, res) {
    //     req.logout();
    //     res.send(200, {
    //         status: "OK"
    //     });
    // });

}

