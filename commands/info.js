module.exports = {
    name: "info",
    category: "Système",

    async execute({ sock, from, config }) {

        await sock.sendMessage(from, {
            text: `
╭━━━〔 ⚙️ SYSTEM INFO ⚙️ 〕━━━╮

🤖 Nom :
${config.botName}

⚡ Version :
2.0.0

🧠 Moteur :
Baileys Multi Device

🌐 Mode :
Online

━━━━━━━━━━━━━━━━━━

⚔️ YAMATO END0 SYSTEM

"Un système puissant
évolue chaque jour."

━━━━━━━━━━━━━━━━━━

👑 Petitempereur 
`
        });

    }
};