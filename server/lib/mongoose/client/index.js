const mongoose = require("mongoose")
const {
    W,
} = require(`../../winston`)

const {
    MONGO_URL,
} = process.env

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
mongoose.connect(MONGO_URL, options)


const db = mongoose.connection;
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
    mongoose.connection.close(function(){
        W.info("Mongoose default connection is disconnected due to application termination");
        process.exit(0)
    })
})

module.exports = mongoose
