import User from "../../mongoose/users/model";
import { W } from "../../winston";
const {
    CLIENTID,
    CLIENTSECERT,
} = process.env

export const config = {
        clientID: CLIENTID,
        clientSecret: CLIENTSECERT,
        callbackURL: "/api/auth/google/redirect"
    }

export const initializeGoogleConfig = async (accessToken: string, refreshToken: any, profile: any, done: any) => {
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