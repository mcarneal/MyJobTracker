"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { W, } = require(`../../winston`);
const { MONGO_URL, } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
if (MONGO_URL) {
    mongoose_1.default.connect(MONGO_URL, options);
}
const db = mongoose_1.default.connection;
db.on("error", () => {
    W.info("> error occurred from the database");
});
db.on('disconnected', () => {
    W.info("Mongoose default connection is disconnected");
});
db.once("open", () => {
    W.info("> Successfully opened connection to the database");
});
process.on('SIGINT', () => {
    mongoose_1.default.connection.close(() => {
        W.info("Mongoose default connection is disconnected due to application termination");
        process.exit(0);
    });
});
exports.default = mongoose_1.default;
