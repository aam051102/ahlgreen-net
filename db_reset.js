require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
});

const fs = require("fs");

const {
    getDatabaseConnection,
    connectToDatabase,
    sessionStore,
    mongoClient,
} = require("./database");

// Setup MongoDB
const setupMongoWait = () => {
    if (!mongoClient.isConnected()) {
        console.log("repeat");
        setTimeout(setupMongoWait, 1000);
        return;
    }


    /// DANGEROUS!!!!!!!
    /// REMOVE THIS LINE TO USE SCRIPT
    return;

    const db = mongoClient.db("homestuck");

    Promise.all([
        new Promise(async (resolve) => {
            // Clear data
            const col = db.collection("asset");
            await col.deleteMany({});

            // Read new data
            let read = fs.readFileSync("./assetData.tsv").toString();
            let lines = read.split("\n");
            
            for(let lineNr = 0; lineNr < lines.length; lineNr++) {
                const line = lines[lineNr];
                
                const fields = line.replace(/\r/g, "").split("\t");
                let amount = parseInt(fields[0]);
                let title = fields[1];

                for(let i = 0; i < amount * 3; i += 3) {
                    let type = fields[2 + i] === "Panel" ? 0 : 1;
                    let assetLink = fields[2 + i + 1];
                    let tags = (fields[2 + i + 2] || "").toLowerCase().split(",").map((tag) => tag.replace(/  /g, " ").replace(/^ *([^]*) *$/g, "$1")).filter((tag) => tag !== "");
                

                    // TODO: Update database
                    await col.insertOne({
                        type: type,
                        content: assetLink,
                        thumbnail: assetLink,
                        tags: tags,
                        page: lineNr + 1,
                    });
                }
            }

            resolve();
        })])
        .catch(console.error)
        .finally(() => {
            process.exit();
        });
};
setupMongoWait();
