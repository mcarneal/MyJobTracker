import User from "../../mongoose/users/model";
import { W } from "../../winston";
const PROFILE_PICTURE_URL = 0
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
        console.log(`this is the profile:`, profile)
        let currentUser
        currentUser = await User.findOne({
            googleId: profile.id,
        })
        const profilePicture = profile.photos[PROFILE_PICTURE_URL].value
        if (currentUser) {
            await currentUser.updateOne({
                accessToken,
                refreshToken,
                profilePicture,
            })
            await currentUser.save()
            done(null, currentUser)
        } else {
            currentUser = await User.create({
                googleId: profile.id,
                displayName: profile.displayName,
                accessToken,
                refreshToken,
                profilePicture,
            })
            currentUser.save()
            done(null, currentUser)
        }
    } catch (e) {
        W.error(`Error occurred in auth: ${e}`)
    }
}