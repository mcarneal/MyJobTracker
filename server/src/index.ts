require(`dotenv`).config()
import express from 'express'
import {
    Request,
    Response,
} from 'express';
import bodyParser from 'body-parser'
import routes from './routes'
import {
    W,
} from './lib/winston'

const {
    PORT,
    NODE_ENV,
} = process.env
const healthyFunction = (req: Request, res: Response) => res.json({
    healthy: true,
})

// The Express app
const app = express()

// setup headers for cors, auth headers....etc
app.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`)
    res.header(`Access-Control-Allow-Methods`, `POST,DELETE,PUT,PATCH,GET,OPTIONS`)
    res.header(`Access-Control-Allow-Headers`, `Origin,X-Requested-With,Content-Type,Accept,Authorization,Access-Control-Allow-1,x-limbik-token, token,Access-Control-Allow-Origin,x-amz-acl`)
    return next()
})

// Allow email template access to an extenral css file
//app.use(express.static(__dirname + `/public`))

app.options(`*`, healthyFunction)
app.get(`/`, healthyFunction)
app.get(`/health`, healthyFunction)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true,
}))

// parse application/json
app.use(bodyParser.json())

app.use(`/api`, routes)



// start the server
app.listen(PORT, () => {
    W.info(`myJobTracker server initiated :`)
    W.info(`Listening on port: ${PORT}`)
    W.info(`App Running in ${NODE_ENV}`)
})

module.exports = app
