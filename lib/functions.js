const fs = require("fs-extra");
const path = require("path");


function getJson(file) {
    const filePath = path.join(__dirname, "..", file);

    if (!fs.existsSync(filePath)) {
        fs.writeJsonSync(filePath, {});
    }

    return fs.readJsonSync(filePath);
}


function saveJson(file, data) {
    const filePath = path.join(__dirname, "..", file);

    fs.writeJsonSync(filePath, data, {
        spaces: 2
    });
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = {
    getJson,
    saveJson,
    sleep
};