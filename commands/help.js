module.exports = {
    name: "help",
    category: "Général",

    async execute({ sock, from, config }) {

        await sock.sendMessage(from, {
            text: `
╭━━━〔 🧠 SYSTEM HELP 🧠 〕━━━╮

🤖 *${config.botName}*

━━━━━━━━━━━━━━━━━━

📌 Utilisation :

Tape :
${config.prefix}menu

pour voir toutes les commandes disponibles.

━━━━━━━━━━━━━━━━━━

⚡ Conseil :
Utilise toujours le préfixe
${config.prefix}

Exemple :
${config.prefix}ping

━━━━━━━━━━━━━━━━━━

⚔️ YAMATO END0 SYSTEM

👑 Petitempereur 
`
        });

    }
};