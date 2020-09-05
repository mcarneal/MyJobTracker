import express from 'express'
const api = express.Router()

const routes = [
    `users`,
]
routes.forEach(route => require(`./${route}`)(api))

export default api
