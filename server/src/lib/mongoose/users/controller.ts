import User from "./model"
import {
    W,
} from "../../winston"
import {
    ICreateUser,
    IDeleteUser,
} from "./types";
import CustomErrors from "../../customErrors"

class UserController {

    public static async createUser({
        displayName,
        password,
        profilePicture = null,
    }: ICreateUser) {
        try {
            const user =  await User.create({
                displayName,
                password,
                profilePicture,
            })
            await user.save()
            return [user]
        } catch (e) {
            W.error(`$Error occurred while creating a user ${e}`)
            throw e
        }
    }
    public static async deleteUser({
        id,
    }: IDeleteUser) {
        try {
            const user = await User.findById(id)
            if (user) {
                user.deleteOne()
                return user
            } else {
                return new CustomErrors.NoUserFoundError({
                    message: `No user found`
                })
            }
        } catch (e) {
            W.error(`Error occurred while attempting to delete user ${e}`)
        }
    }
}

export default UserController