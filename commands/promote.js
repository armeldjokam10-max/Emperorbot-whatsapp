module.exports = {
    name: "promote",
    category: "Gestion Groupe",

    async execute({ sock, from, msg }) {

        const user =
        msg.message.extendedTextMessage?.contextInfo?.participant;

        if (!user) {
            return sock.sendMessage(from,{
                text:"⚠️ Mentionne la personne à promouvoir."
            });
        }

        await sock.groupParticipantsUpdate(
            from,
            [user],
            "promote"
        );

        await sock.sendMessage(from,{
            text:
`
👑 Promotion réussie !

Le membre devient administrateur.

⚔️ YAMATO END0

👑 Petitempereur 
`
        });

    }
};