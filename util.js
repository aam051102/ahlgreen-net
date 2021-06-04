const fs = require("fs");

// Logs errors to file
const logError = (err) => {
	console.trace(err);
    fs.appendFileSync("./errors.txt", `${new Date()}: ${err}\n`);
}

module.exports = {
	logError
};