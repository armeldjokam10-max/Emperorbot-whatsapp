module.exports = {
    name: "tagall",
    category: "Gestion Groupe",

    async execute({ sock, from }) {

        const metadata = await sock.groupMetadata(from);

        let message = `
╭━━〔 📢 TAG ALL 〕━━╮

👑 Appel général du groupe

`;

        let mentions = [];

        for (const member of metadata.participants) {

            mentions.push(member.id);

            message += `⚔️ @${member.id.split("@")[0]}\n`;
        }

        message += `
━━━━━━━━━━━━━━

👑 Petitempereur 
`;

        await sock.sendMessage(from, {
            text: message,
            mentions
        });

    }
};