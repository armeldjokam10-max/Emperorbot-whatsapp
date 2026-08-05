module.exports = {
    name: "demote",
    category: "Gestion Groupe",

    async execute({ sock, from, msg }) {

        const user =
        msg.message.extendedTextMessage?.contextInfo?.participant;

        if (!user) {
            return sock.sendMessage(from,{
                text:"⚠️ Mentionne l'administrateur."
            });
        }

        await sock.groupParticipantsUpdate(
            from,
            [user],
            "demote"
        );

        await sock.sendMessage(from,{
            text:
`
🔻 Administration retirée.

Le membre n'est plus administrateur.

⚔️ YAMATO END0 SYSTEM

👑 Petitempereur 
`
        });

    }
};