const games = new Map();

module.exports = {
    name: "morpion",
    category: "Jeux",

    async execute({ sock, from, args }) {

        if (!games.has(from)) {

            games.set(from, {
                board: [
                    "1️⃣","2️⃣","3️⃣",
                    "4️⃣","5️⃣","6️⃣",
                    "7️⃣","8️⃣","9️⃣"
                ],
                players: []
            });

        }


        let game = games.get(from);


        if (game.players.length < 2) {

            game.players.push(args[0] || from);

            return sock.sendMessage(from,{
                text:
`
╭━━〔 ❌ MORPION ⚔️ 〕━━╮

🎮 Partie créée !

Joueurs :
👤 ${game.players.length}/2

En attente du deuxième joueur...

━━━━━━━━━━━━

Utilise :
!morpion pour rejoindre

👑 Petit Empereur
`
            });

        }


        await sock.sendMessage(from,{
            text:
`
╭━━〔 ❌ MORPION BOARD 〕━━╮

${game.board[0]} ${game.board[1]} ${game.board[2]}
${game.board[3]} ${game.board[4]} ${game.board[5]}
${game.board[6]} ${game.board[7]} ${game.board[8]}

━━━━━━━━━━━━

🎮 Deux joueurs connectés.

⚔️ Yamato Game System

👑 Petit Empereur
`
        });

    }
};