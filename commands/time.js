module.exports = {
    name: "time",
    category: "Général",

    async execute({ sock, from }) {

        const date = new Date();

        await sock.sendMessage(from, {
            text: `
🕒 *SYSTEM CLOCK*

📅 Date :
${date.toLocaleDateString()}

⏰ Heure :
${date.toLocaleTimeString()}

━━━━━━━━━━━━━━

👑 Petitempereur 
`
        });

    }
};