const functions = require(`./functions`)

const RESOURCE = `users`
const ACCOUNT_PREFIX = `:accountId`
// const BASE_PATH = `/${ACCOUNT_PREFIX}/${RESOURCE}`

module.exports = api => {
    api.get(`/${RESOURCE}/`, functions.fetchAllUsers)
}
