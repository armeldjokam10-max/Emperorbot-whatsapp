module.exports = {
    name: "grouplink",
    category: "Gestion Groupe",

    async execute({ sock, from }) {

        const code = await sock.groupInviteCode(from);

        await sock.sendMessage(from, {
            text:
`
🔗 *LIEN DU GROUPE*

https://chat.whatsapp.com/${code}

━━━━━━━━━━━━━━

⚔️ YAMATO END0
👑 Petitempereur 
`
        });

    }
};