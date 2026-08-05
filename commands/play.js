const yts = require("yt-search");

module.exports = {
    name: "play",
    category: "Média",

    async execute({ sock, from, args }) {

        const query = args.join(" ");

        if (!query) {
            return sock.sendMessage(from,{
                text:
`
╭━━〔 🎵 YAMATO MEDIA CORE 〕━━╮

⚠️ Recherche manquante

Exemple :
!play Imagine Dragons

━━━━━━━━━━━━━━

⚔️ Analyse par le génie
du Petit Empereur

👑 Petit Empereur
`
            });
        }


        const search = await yts(query);

        const video = search.videos[0];

        if (!video) {
            return sock.sendMessage(from,{
                text:"❌ Aucun résultat trouvé."
            });
        }


        await sock.sendMessage(from,{
            text:
`
╭━━〔 ⚔️ YAMATO END0 🎵 〕━━╮

🎧 Titre :
${video.title}

👁️ Vues :
${video.views}

⏱️ Durée :
${video.timestamp}

🔗 Lien :
${video.url}

━━━━━━━━━━━━━━

🧠 Recherche terminée

👑 Petit Empereur
`
        });

    }
};