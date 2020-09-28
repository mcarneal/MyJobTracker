import mongoose from '../client'
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
    }
}

const UserSchema = new Schema(schema)

export default model(`User`, UserSchema, `User`)

