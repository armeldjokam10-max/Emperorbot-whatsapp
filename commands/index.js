const fs = require("fs");
const path = require("path");

const commands = new Map();

const commandFiles = fs.readdirSync(__dirname)
    .filter(file => file.endsWith(".js") && file !== "index.js");


for (const file of commandFiles) {

    const command = require(
        path.join(__dirname, file)
    );

    if (command.name) {
        commands.set(
            command.name,
            command
        );
    }

    if (command.aliases) {

        for (const alias of command.aliases) {

            commands.set(
                alias,
                command
            );

        }

    }

}


module.exports = commands;