import mongoose from '../client'
import bcrypt from "bcrypt"
import {
    IUserSchema
} from "./types";
const {
    SALT
}  = process.env

const SALT_ROUNDS = parseInt(`${SALT}`)

const {
    Schema,
    model,
} = mongoose

const schema = {
    id: Schema.Types.ObjectId,
    displayName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        required: false,
    },
    accessToken: {
        type: String,
        required: false,
    },
    refreshToken: {
        type: String,
        required: false,
    },
    profilePicture: {
        type: String,
        required: false,
    },
    salt: {
        type: Buffer,
        required: false
    }
}

const UserSchema = new Schema(schema)

UserSchema.pre<IUserSchema>("save", async function(next) {
    const user = this;
    if (!user.isModified("password"))  return next();
    await bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.isPasswordValid = async function(rawPassword: any, password: any, callback: (arg0: Error | null, arg1: boolean | undefined) => void) {
    await bcrypt.compare(rawPassword, password, function(err, same) {
        if (err) {
            callback(err, undefined);
        }
        callback(null, same);
    });
};

export default model(`User`, UserSchema, `User`)

