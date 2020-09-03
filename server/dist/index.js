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
const { PORT, NODE_ENV, } = process.env;
const healthyFunction = (req, res) => res.json({
    healthy: true,
});
// The Express app
const app = express_1.default();
// setup headers for cors, auth headers....etc
app.use((req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `POST,DELETE,PUT,PATCH,GET,OPTIONS`);
    res.header(`Access-Control-Allow-Headers`, `Origin,X-Requested-With,Content-Type,Accept,Authorization,Access-Control-Allow-1,x-limbik-token, token,Access-Control-Allow-Origin,x-amz-acl`);
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
app.use(`/api`, routes_1.default);
// start the server
app.listen(PORT, () => {
    winston_1.W.info(`myJobTracker server initiated :`);
    winston_1.W.info(`Listening on port: ${PORT}`);
    winston_1.W.info(`App Running in ${NODE_ENV}`);
});
module.exports = app;
