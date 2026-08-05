module.exports = {
    name: "vv",
    category: "Média",

    async execute({ sock, from, msg }) {

        const quoted =
            msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;


        if (!quoted) {
            return sock.sendMessage(from, {
                text: `
╭━━〔 👁️ YAMATO MEDIA 〕━━╮

⚠️ Réponds à un média avec :

!vv

pour traiter un média accessible.

━━━━━━━━━━━━━━━━

🧠 Module média du
👑 Petit Empereur

⚔️ YAMATO END0 SYSTEM
`
            });
        }


        let type = Object.keys(quoted)[0];


        if (
            type !== "imageMessage" &&
            type !== "videoMessage" &&
            type !== "audioMessage"
        ) {

            return sock.sendMessage(from,{
                text:
`
⚠️ Type de média non supporté.

Formats acceptés :
🖼️ Image
📹 Vidéo
🎵 Audio

👑 Petit Empereur
`
            });

        }


        await sock.sendMessage(from,{
            text:
`
╭━━〔 ⚔️ YAMATO MEDIA CORE 〕━━╮

✅ Média détecté

📂 Type :
${type.replace("Message","")}

🧠 Système :
Analyse terminée

━━━━━━━━━━━━━━━━

⚡ Module média opérationnel.

👑 Petit Empereur
`
        });


    }
};