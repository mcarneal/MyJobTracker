import mongoose from '../client'
const {
    Schema,
    model,
} = mongoose

const schema = {
    id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    index: {
        type: Number,
        required: true,
    },
}

const ItemComponentSchema = new Schema(schema)

export default model(`ItemComponent`, ItemComponentSchema, `ItemComponent`)

