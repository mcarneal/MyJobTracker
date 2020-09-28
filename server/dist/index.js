"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require(`dotenv`).config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const winston_1 = require("./lib/winston");
const passport_1 = __importDefault(require("passport"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const { PORT, NODE_ENV, } = process.env;
const healthyFunction = (req, res) => res.json({
    healthy: true,
});
// The Express app
const app = express_1.default();
//Use cookieParser
app.use(cookie_parser_1.default());
// setup cookie session options
app.use(cookie_session_1.default({
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    keys: ["cookie_session_key_here"]
}));
// Setup apps cors
app.use(cors_1.default({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
}));
// setup headers for cors, auth headers....etc
app.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `http://localhost:3000`);
    res.header('Access-Control-Allow-Credentials', `true`);
    res.header(`Access-Control-Allow-Methods`, `POST,DELETE,PUT,PATCH,GET,OPTIONS`);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    return next();
});
// Allow email template access to an extenral css file
//app.use(express.static(__dirname + `/public`))
app.options(`*`, healthyFunction);
app.get(`/`, healthyFunction);
app.get(`/health`, healthyFunction);
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({
    extended: true,
}));
// parse application/json
app.use(body_parser_1.default.json());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(`/api`, routes_1.default);
// start the server
app.listen(PORT, () => {
    winston_1.W.info(`myJobTracker server initiated :`);
    winston_1.W.info(`Listening on port: ${PORT}`);
    winston_1.W.info(`App Running in ${NODE_ENV}`);
});
module.exports = app;
