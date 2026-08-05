module.exports = {
    name: "rules",
    category: "Général",

    async execute({ sock, from }) {

        await sock.sendMessage(from, {
            text: `
╭━━〔 📜 RÈGLES 〕━━╮

1️⃣ Respecter les autres utilisateurs

2️⃣ Ne pas spammer le bot

3️⃣ Utiliser les commandes correctement

4️⃣ Respecter les administrateurs

━━━━━━━━━━━━━━

⚔️ YAMATO END0

👑 Petitempereur 
`
        });

    }
};