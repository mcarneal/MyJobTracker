const {describe, test, beforeAll, afterEach} = require("@jest/globals")
const User = require(`../../lib/mongoose/users/model`)
const mongoose = require(`mongoose`)
const {
    MONGO_URL : url
} = process.env

describe(`This is the first test`, () => {
    beforeAll(async () => {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    })
    afterEach(async () => {
        await mongoose.connection.close()
    })
    test(`this is the first test`, async () => {
        const input = 0
        const output = 0
        const user = new User({
            userName: `test database user`,
        })
        await user.save()
        expect(input).toEqual(output)
    })

})
