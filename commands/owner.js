module.exports = {
    name: "owner",
    category: "Général",

    async execute({ sock, from, config }) {

        await sock.sendMessage(from, {
            text: `
╭━━━〔 👑 CRÉATEUR SYSTEM 👑 〕━━━╮

⚔️ *YAMATO END0*

━━━━━━━━━━━━━━━━━━

👤 Développeur :
${config.owner.name}

🤖 Projet :
${config.botName}

🧠 Rôle :
Architecte du système

━━━━━━━━━━━━━━━━━━

"Chaque empire commence
par une vision."

━━━━━━━━━━━━━━━━━━

👑 Petitempereur 
`
        });

    }
};