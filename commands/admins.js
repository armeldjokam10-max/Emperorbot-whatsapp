module.exports = {
    name: "admins",
    category: "Gestion Groupe",

    async execute({ sock, from }) {

        const metadata = await sock.groupMetadata(from);

        const admins = metadata.participants
        .filter(p => p.admin)
        .map(p => `👑 @${p.id.split("@")[0]}`);

        await sock.sendMessage(from, {
            text:
`
╭━━〔 👑 ADMINS 〕━━╮

${admins.join("\n")}

━━━━━━━━━━━━━━

⚔️ YAMATO END0
👑 Petitempereur 
`,
            mentions: metadata.participants
            .filter(p => p.admin)
            .map(p => p.id)
        });

    }
};