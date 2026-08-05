const commands = require("./index");

module.exports = {
    name: "menu",
    aliases: ["help", "aide"],

    async execute({ sock, from, config }) {

        let menu = `
╭━━━〔 ⚔️ YAMATO ENDO ⚔️ 〕━━━╮

        👑 ${config.botName}

╰━━━━━━━━━━━━━━━━━━╯

🌟 Bienvenue dans mon univers

⚡ Préfixe : ${config.prefix}
📡 Statut : En ligne

━━━━━━━━━━━━━━━━━━
`;

        let categories = {};

        for (const [name, cmd] of commands) {

            let category = cmd.category || "Autres";

            if (!categories[category]) {
                categories[category] = [];
            }

            categories[category].push(name);

        }


        for (const category in categories) {

            menu += `
╭━━〔 ${category.toUpperCase()} 〕━━╮
`;

            categories[category].forEach(command => {
                menu += `┃ ⚔️ ${config.prefix}${command}\n`;
            });

            menu += `╰━━━━━━━━━━━━╯\n`;
        }


        menu += `
━━━━━━━━━━━━━━━━━━

⚔️ YAMATO ENDO SYSTEM ⚔️

"Un véritable empereur construit son royaume."

━━━━━━━━━━━━━━━━━━

👑 Petit empereur
`;

        await sock.sendMessage(from, {
            text: menu
        });

    }
};