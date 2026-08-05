const yts = require("yt-search");

module.exports = {
    name: "song",
    category: "Média",

    async execute({ sock, from, args }) {

        const query = args.join(" ");

        if (!query) {
            return sock.sendMessage(from, {
                text: `
╭━━〔 🎧 YAMATO MUSIC CORE 〕━━╮

⚠️ Aucune musique indiquée.

Exemple :
!song Imagine Dragons

━━━━━━━━━━━━━━━━

🧠 Le moteur musical du
👑 Petit Empereur attend ta recherche.

⚔️ YAMATO END0 SYSTEM
`
            });
        }


        try {

            const result = await yts(query);

            const music = result.videos[0];

            if (!music) {
                return sock.sendMessage(from, {
                    text: `
❌ Aucun son trouvé.

⚔️ Recherche abandonnée.

👑 Petit Empereur
`
                });
            }


            await sock.sendMessage(from, {
                text: `
╭━━〔 🎵 YAMATO MUSIC 〕━━╮

🎶 Titre :
${music.title}

👤 Auteur :
${music.author.name}

⏱️ Durée :
${music.timestamp}

👁️ Vues :
${music.views}

🔗 Lien :
${music.url}

━━━━━━━━━━━━━━━━

⚡ Analyse musicale terminée.

"Un véritable empereur maîtrise
les informations avant l'action."

━━━━━━━━━━━━━━━━

👑 Petit Empereur
`
            });


        } catch (e) {

            console.log(e);

            await sock.sendMessage(from, {
                text: `
⚠️ Erreur du moteur musical.

Réessaie plus tard.

👑 Petit Empereur
`
            });

        }

    }
};