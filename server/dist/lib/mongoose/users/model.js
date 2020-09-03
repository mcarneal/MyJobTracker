"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../client"));
const { Schema, model, } = client_1.default;
const schema = {
    id: Schema.Types.ObjectId,
    userName: {
        type: String,
        required: true,
    },
};
const UserSchema = new Schema(schema);
exports.default = model(`User`, UserSchema, `User`);
