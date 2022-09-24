require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

const { mongoClient } = require("./database");

// Setup MongoDB
const setupMongoWait = () => {
    if (!mongoClient.isConnected()) {
        console.log("repeat");
        setTimeout(setupMongoWait, 1000);
        return;
    }

    const db = mongoClient.db("homestuck");

    Promise.all([db.createCollection("tag"), db.createCollection("asset")])
        .catch(() => {})
        .finally(() => {
            process.exit();
        });
};
setupMongoWait();
