const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const { MongoClient } = require("mongodb");
const { logError } = require("./util");

// MongoDB connection
const mongoClient = new MongoClient(process.env.MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
mongoClient.connect();

// MySQL database connection
let databaseConnection;

const getDatabaseConnection = () => {
    return databaseConnection;
};

const connectToDatabase = () => {
    databaseConnection = mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        password: process.env.MYSQL_PASSWORD,
        database: "ahlgreen_net",
    });

    /*databaseConnection.connect((err) => {
        if (err) {
            logError(err);
            setTimeout(connectToDatabase, 2000);
        } else {
            console.log("Successfully connected to MySQL database.");
        }
    });*/

    databaseConnection.on("error", (err) => {
        logError(err);

        if(err.code === "PROTOCOL_CONNECTION_LOST" || err.fatal) {
            connectToDatabase();
        }
    });

    return databaseConnection;
};
connectToDatabase();

// Session store
const sessionStore = new MySQLStore({
    host: "localhost",
    port: "3306",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "ahlgreen_net",
});

module.exports = {
    getDatabaseConnection,
    connectToDatabase,
    sessionStore,
    mongoClient,
};
