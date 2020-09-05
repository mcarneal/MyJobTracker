import mongoose from '../client'
const {
    Schema,
    model,
} = mongoose

const schema = {
    id: Schema.Types.ObjectId,
    userName: {
        type: String,
        required: true,
    },
}

const UserSchema = new Schema(schema)

export default model(`User`, UserSchema, `User`)

