const mongoose = require(`../client`)
const timestamps = require(`mongoose-timestamp`)
const {
    Schema,
    model,
} = mongoose

const schema = {
    id: Schema.ObjectId,
    userName: {
        type: String,
        required: true,
    },
    // searchId: {
    //     type: Schema.Types.ObjectId,
    //     ref: `SavedSearch`,
    //     required: true,
    // },
}

const UserSchema = new Schema(schema)

module.exports = mongoose.model(`User`, UserSchema, `User`)

