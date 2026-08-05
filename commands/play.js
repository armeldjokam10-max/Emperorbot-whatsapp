const axios = require("axios");

module.exports = {
    name: "play",
    category: "Média",

    async execute({ sock, from, args, config }) {

        const query = args.join(" ");

        if (!query) {
            return sock.sendMessage(from, {
                text: `
╭━━━〔 🎵 YAMATO MEDIA 〕━━━╮

⚠️ Commande incomplète

Utilisation :
!play nom de la musique

Exemple :
!play Imagine Dragons Believer

━━━━━━━━━━━━━━━━

🎧 Le génie musical de
👑 Petit Empereur
`
            });
        }


        await sock.sendMessage(from, {
            text: `
╭━━━〔 ⚔️ YAMATO END0 🎵 〕━━━╮

🧠 Analyse musicale lancée...

🔎 Recherche :
${query}

⚙️ Système :
YouTube Engine

━━━━━━━━━━━━━━━━

⏳ Préparation du média...

"Un véritable empereur ne cherche pas
le pouvoir, il maîtrise son système."

━━━━━━━━━━━━━━━━

👑 Petit Empereur
`
        });


        // La connexion YouTube sera ajoutée ici
        // avec YOUTUBE_API_KEY
    }
};