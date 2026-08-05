module.exports = {
    name: "ping",
    category: "Général",

    async execute({ sock, from }) {

        const start = Date.now();

        await sock.sendMessage(from, {
            text: `
╭━━━〔 ⚔️ YAMATO END0 ⚔️ 〕━━━╮

        🛰️ *SYSTEM CHECK*

╰━━━━━━━━━━━━━━━━━━╯

⚡ Connexion :
✅ Opérationnelle

🧠 Core :
✅ Stable

🌐 Réseau :
✅ Synchronisé

🚀 Latence :
${Date.now() - start} ms

━━━━━━━━━━━━━━━━━━

🤖 *EmperorBot est en ligne*

"Un vrai système ne dort jamais,
il évolue."

━━━━━━━━━━━━━━━━━━

👑 Petitempereur
`
        });

    }
};