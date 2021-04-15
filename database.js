const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const { MongoClient } = require("mongodb");

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
    databaseConnection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: process.env.MYSQL_PASSWORD,
        database: "ahlgreen_net",
    });

    databaseConnection.connect((err) => {
        if (err) {
            console.error("Failed to connect to MySQL database:", err);
            setTimeout(connectToDatabase, 2000);
        } else {
            console.log("Successfully connected to MySQL database.");
        }
    });

    databaseConnection.on("error", (err) => {
        if(err.code === "PROTOCOL_CONNECTION_LOST") {
            connectToDatabase();
        } else {
            console.log("MySQL Error: ", err);
            throw err;
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
