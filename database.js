const mysql = require("mysql");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const { connect } = require("http2");

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
        } else {
            console.log("Successfully connected to MySQL database.");
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
};
