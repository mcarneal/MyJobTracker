import {NextFunction, Request, Response,} from "express"
import passport from "../../lib/passport";
import User from "../../lib/mongoose/users/model";
import {W} from "../../lib/winston";
import {OAuth2Client} from "google-auth-library";
import Boom from "boom";
import queryTimer from "../../lib/helpers/queryTimer";
const {
    CLIENTID,
    CLIENTSECERT,
} = process.env
const SUCCESS = 200

const handleLocalAuthentication = async (req: Request, res: Response, next: NextFunction ) =>{
        passport.authenticate("local", function(err: any, user: Express.User, info: { message: any; }) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(500).json( info.message);
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }
                return res.status(201).json({
                    result: {
                        data: user,
                    }
                });
            });
        })(req, res, next);
}

const handleGoogleRefreshToken = async (req: Request, res: Response) => {
    try {
        const client = new OAuth2Client(
            CLIENTID,
            CLIENTSECERT
        );
        const user: any = req.user
        if (user) {
            client.setCredentials({
                refresh_token: user.refreshToken
            });
            client.refreshAccessToken( async (err, token) => {
                if (token) {
                    const accessToken = token.access_token
                    const refreshToken = token.refresh_token
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
}

const autoLogin = async (req: Request, res: Response) => {
    try {
        console.log(`this is the user req`,req.user)
        queryTimer.processStarted()
        const isAuthenticated = req.isAuthenticated()
        let user;
        if (req.user) user = req.user
        res.status(SUCCESS).json({
            result: {
                queryTime: queryTimer.processFinished(),
                data: {
                    isAuthenticated,
                    user,
                }
            }
        })
    } catch (e) {
        W.error(e.message)
        res.status(e.status).json({
            result: Boom.badImplementation(e)
        })
    }
}

const logout = async (req: Request, res: Response) => {
    try {
        queryTimer.processStarted()
        req.logout();
        res.status(SUCCESS).json({
            result: {
                queryTime: queryTimer.processFinished(),
                data: {
                    loggedOut: true,
                }
            }
        })
    } catch (e) {
        W.error(e.message)
        res.status(e.status).json({
            result: Boom.badImplementation(e)
        })
    }
}

export default {
    autoLogin,
    logout,
    handleGoogleRefreshToken,
    handleLocalAuthentication,
}