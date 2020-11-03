"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { SALT } = process.env;
const SALT_ROUNDS = parseInt(`${SALT}`);
const { Schema, model, } = client_1.default;
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
};
const UserSchema = new Schema(schema);
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified("password"))
            return next();
        yield bcrypt_1.default.genSalt(SALT_ROUNDS, function (err, salt) {
            if (err)
                return next(err);
            bcrypt_1.default.hash(user.password, salt, function (err, hash) {
                if (err)
                    return next(err);
                user.password = hash;
                next();
            });
        });
    });
});
UserSchema.methods.isPasswordValid = function (rawPassword, password, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield bcrypt_1.default.compare(rawPassword, password, function (err, same) {
            if (err) {
                callback(err, undefined);
            }
            callback(null, same);
        });
    });
};
exports.default = model(`User`, UserSchema, `User`);
