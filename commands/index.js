const fs = require("fs");
const path = require("path");

function loadCommands() {
  const commands = new Map();
  const commandsPath = __dirname;

  function scanDirectory(directory) {
    if (!fs.existsSync(directory)) return;

    const files = fs.readdirSync(directory);

    for (const file of files) {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath);
        continue;
      }

      if (!file.endsWith(".js")) continue;
      if (file === "index.js") continue;

      try {
        const command = require(fullPath);

        if (!command.name || typeof command.execute !== "function") {
          console.log(`⚠️ Commande ignorée : ${fullPath}`);
          continue;
        }

        commands.set(command.name.toLowerCase(), command);

        if (Array.isArray(command.aliases)) {
          for (const alias of command.aliases) {
            commands.set(alias.toLowerCase(), command);
          }
        }

        console.log(`✅ Commande chargée : ${command.name}`);
      } catch (error) {
        console.error(
          `❌ Erreur dans ${fullPath} :`,
          error.message
        );
      }
    }
  }

  scanDirectory(commandsPath);

  return commands;
}

module.exports = {
  loadCommands
};