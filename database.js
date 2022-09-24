const { MongoClient } = require("mongodb");

// MongoDB connection
const mongoClient = new MongoClient(process.env.MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});
mongoClient.connect();

module.exports = {
    mongoClient,
};
