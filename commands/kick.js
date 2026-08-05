module.exports = {
    name: "kick",
    category: "Gestion Groupe",

    async execute({ sock, from, msg }) {

        const metadata = await sock.groupMetadata(from);

        const botNumber = sock.user.id.split(":")[0] + "@s.whatsapp.net";

        const botAdmin = metadata.participants
            .find(p => p.id === botNumber)?.admin;

        if (!botAdmin) {
            return sock.sendMessage(from, {
                text: "⚠️ Je dois être administrateur pour utiliser cette commande."
            });
        }

        const user =
            msg.message.extendedTextMessage?.contextInfo?.participant;

        if (!user) {
            return sock.sendMessage(from, {
                text: "⚠️ Mentionne un membre à retirer."
            });
        }

        await sock.groupParticipantsUpdate(
            from,
            [user],
            "remove"
        );

        await sock.sendMessage(from, {
            text:
`
╭━━〔 ⚔️ EXPULSION 〕━━╮

✅ Membre retiré du groupe.

⚔️ YAMATO END0 SYSTEM

👑 Petitempereur 
`
        });

    }
};