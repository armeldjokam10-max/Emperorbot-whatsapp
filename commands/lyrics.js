const axios = require("axios");

module.exports = {
    name: "lyrics",
    category: "Média",

    async execute({ sock, from, args, config }) {

        const query = args.join(" ");

        if (!query) {
            return sock.sendMessage(from, {
                text: `
╭━━〔 🎤 YAMATO LYRICS CORE 〕━━╮

⚠️ Aucun titre fourni.

Exemple :
!lyrics Imagine Dragons Believer

━━━━━━━━━━━━━━━━

🧠 Le génie musical du
👑 Petit Empereur
`
            });
        }


        try {

            const response = await axios.get(
                "https://api.genius.com/search",
                {
                    params: {
                        q: query
                    },
                    headers: {
                        Authorization:
                        `Bearer ${config.api.genius}`
                    }
                }
            );


            const song =
            response.data.response.hits[0];


            if (!song) {

                return sock.sendMessage(from,{
                    text:
`
❌ Aucun morceau trouvé.

⚔️ Recherche interrompue.

👑 Petit Empereur
`
                });

            }


            const title =
            song.result.full_title;


            const url =
            song.result.url;


            await sock.sendMessage(from,{
                text:
`
╭━━〔 🎤 YAMATO MUSIC 〕━━╮

🎵 Titre :
${title}

📖 Paroles disponibles :

${url}

━━━━━━━━━━━━━━━━

⚔️ Analyse musicale terminée.

"Le savoir est une arme,
la musique est une mémoire."

━━━━━━━━━━━━━━━━

👑 Petit Empereur
`
            });


        } catch (error) {

            console.log(error);

            await sock.sendMessage(from,{
                text:
`
⚠️ Erreur du système Lyrics.

Vérifie la clé Genius.

👑 Petit Empereur
`
            });

        }

    }
};