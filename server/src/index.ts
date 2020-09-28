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
import passport from "passport"
import cookieSession from "cookie-session"
import cookieParser from "cookie-parser"
import cors from "cors"

const {
    PORT,
    NODE_ENV,
} = process.env
const healthyFunction = (req: Request, res: Response) => res.json({
    healthy: true,
})


// The Express app
const app = express()

//Use cookieParser
app.use(cookieParser())

// setup cookie session options
app.use(cookieSession({
    httpOnly: true,
    maxAge: 24*60*60*1000,
    keys:["cookie_session_key_here"]
}));

// Setup apps cors
app.use(
    cors({
        origin: "http://localhost:3000", // allow to server to accept request from different origin
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // allow session cookie from browser to pass through
    })
);


// setup headers for cors, auth headers....etc
app.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `http://localhost:3000`)
    res.header('Access-Control-Allow-Credentials', `true`);
    res.header(`Access-Control-Allow-Methods`, `POST,DELETE,PUT,PATCH,GET,OPTIONS`)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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

app.use(passport.initialize());
app.use(passport.session());

app.use(`/api`, routes)



// start the server
app.listen(PORT, () => {
    W.info(`myJobTracker server initiated :`)
    W.info(`Listening on port: ${PORT}`)
    W.info(`App Running in ${NODE_ENV}`)
})

module.exports = app
