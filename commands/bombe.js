const games = new Map();

module.exports = {
    name: "bombe",
    category: "Jeux",

    async execute({ sock, from }) {

        const position =
        Math.floor(Math.random() * 9) + 1;


        await sock.sendMessage(from,{
            text:
`
╭━━〔 💣 BOMBE GAME 〕━━╮

⚔️ Nouvelle partie lancée !

🎮 Grille :

1️⃣ 2️⃣ 3️⃣
4️⃣ 5️⃣ 6️⃣
7️⃣ 8️⃣ 9️⃣

💣 La bombe est cachée...

Les joueurs doivent choisir une case.

━━━━━━━━━━━━

🧠 Jeu stratégique Yamato

👑 Petit Empereur
`
        });

    }
};