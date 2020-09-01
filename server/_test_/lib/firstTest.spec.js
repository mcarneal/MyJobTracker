const {describe, test, beforeAll, afterEach} = require("@jest/globals")
const User = require(`../../lib/mongoose/users/model`)
const mongoose = require(`mongoose`)

describe(`This is the first test`, () => {
    beforeAll(async () => {
        const url = `mongodb://mcarneal:chair2004@mongoDB/test`
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    })
    afterEach(async () => {
        const url = `mongodb://mcarneal:chair2004@mongoDB/test`
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
