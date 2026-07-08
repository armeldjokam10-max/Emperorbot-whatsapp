const gameStates = {};
const db = require('../database/reponses.js');

module.exports = {
    name: 'jeux',
    execute: async (message, args, client, prefix, utils) => {
        const cmd = args[0].toLowerCase();
        const sender = message.from;
        const getRandom = utils.getRandom;

        if (!gameStates[sender]) gameStates[sender] = {};

        switch(cmd) {
            // ===== ANAGRAMME =====
            case 'anagramme':
                const anag = getRandom(db.anagrammes);
                const mel = anag.mot.split('').sort(() => Math.random() - 0.5).join(' ');
                gameStates[sender].anagramme = anag;
                await message.reply(`🔤 *Anagramme*\n\n🔀 ${mel}\n\nRéponds avec .repondre [mot]`);
                break;

            // ===== DÉFI =====
            case 'defi':
                await message.reply(`🎯 *Défi*\n\n${getRandom(db.defis)}`);
                break;

            // ===== IMPOSTEUR ANIME =====
            case 'imposteur_anime':
                const anime = getRandom(db.animes);
                const chars = [...anime.personnages];
                const impost = getRandom(anime.imposteurs);
                chars.push(impost);
                for (let i = chars.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [chars[i], chars[j]] = [chars[j], chars[i]];
                }
                gameStates[sender].imposteur = {
                    imposteur: impost,
                    anime: anime.nom,
                    personnages: chars,
                    round: 1,
                    points: {}
                };
                await message.reply(
                    `🎮 *Imposteur Anime - Round 1/5*\n\nAnime : ${anime.nom}\n\n1️⃣ ${chars[0]}\n2️⃣ ${chars[1]}\n3️⃣ ${chars[2]}\n4️⃣ ${chars[3]}\n\nRéponds avec 1, 2, 3 ou 4`
                );
                break;

            // ===== RÉPONDRE (pour tous les jeux) =====
            case 'repondre':
                if (gameStates[sender].imposteur) {
                    const jeu = gameStates[sender].imposteur;
                    const choix = parseInt(args[1]);
                    if (isNaN(choix) || choix < 1 || choix > 4) {
                        await message.reply('❌ Réponds avec 1, 2, 3 ou 4');
                        break;
                    }
                    const perso = jeu.personnages[choix - 1];
                    if (perso === jeu.imposteur) {
                        await message.reply(`🎉 Bravo ! L'imposteur était ${jeu.imposteur}`);
                    } else {
                        await message.reply(`❌ Perdu ! L'imposteur était ${jeu.imposteur}`);
                    }
                    delete gameStates[sender].imposteur;
                } else if (gameStates[sender].anagramme) {
                    const rep = args.slice(1).join(' ').toUpperCase();
                    if (!rep) {
                        await message.reply('❌ Donne ta réponse.');
                        break;
                    }
                    const anag = gameStates[sender].anagramme;
                    if (rep === anag.mot) {
                        await message.reply(`🎉 Bravo ! La réponse était ${anag.mot}`);
                    } else {
                        await message.reply(`❌ Mauvaise réponse. Indice : ${anag.anagramme}`);
                    }
                    delete gameStates[sender].anagramme;
                } else {
                    await message.reply('❌ Aucun jeu en cours.');
                }
                break;

            // ===== MORPION =====
            case 'morpion':
                if (!gameStates[sender].morpion) {
                    gameStates[sender].morpion = {
                        plateau: ['_', '_', '_', '_', '_', '_', '_', '_', '_'],
                        tour: 1,
                        joueur1: message.author,
                        joueur2: null
                    };
                    await message.reply(
                        `❌ *Morpion*\n\nJoueur 1 : ${message.author}\nRejoins : .morpion join\nJoue : .morpion jouer 1-9`
                    );
                } else if (args[1] === 'join') {
                    const m = gameStates[sender].morpion;
                    if (m.joueur2) {
                        await message.reply('❌ Partie complète.');
                        break;
                    }
                    m.joueur2 = message.author;
                    await message.reply(`✅ ${message.author} a rejoint !`);
                } else if (args[1] === 'jouer') {
                    const m = gameStates[sender].morpion;
                    const pos = parseInt(args[2]) - 1;
                    if (isNaN(pos) || pos < 0 || pos > 8) {
                        await message.reply('❌ Position 1-9.');
                        break;
                    }
                    const joueur = m.tour === 1 ? m.joueur1 : m.joueur2;
                    if (message.author !== joueur) {
                        await message.reply('❌ Pas ton tour.');
                        break;
                    }
                    if (m.plateau[pos] !== '_') {
                        await message.reply('❌ Case prise.');
                        break;
                    }
                    const sym = m.tour === 1 ? 'X' : 'O';
                    m.plateau[pos] = sym;

                    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
                    let gagne = false;
                    for (const w of wins) {
                        const [a,b,c] = w;
                        if (m.plateau[a] !== '_' && m.plateau[a] === m.plateau[b] && m.plateau[a] === m.plateau[c]) {
                            gagne = true;
                            break;
                        }
                    }
                    const aff = () => {
                        const p = m.plateau;
                        return `\`\`\`\n${p[0]} | ${p[1]} | ${p[2]}\n---------\n${p[3]} | ${p[4]} | ${p[5]}\n---------\n${p[6]} | ${p[7]} | ${p[8]}\n\`\`\``;
                    };
                    if (gagne) {
                        await message.reply(`🎉 ${joueur} a gagné !\n\n${aff()}`);
                        delete gameStates[sender].morpion;
                        break;
                    }
                    if (!m.plateau.includes('_')) {
                        await message.reply(`🤝 Match nul !\n\n${aff()}`);
                        delete gameStates[sender].morpion;
                        break;
                    }
                    m.tour = m.tour === 1 ? 2 : 1;
                    const prochain = m.tour === 1 ? m.joueur1 : m.joueur2;
                    await message.reply(`${aff()}\n\nAu tour de ${prochain}`);
                }
                break;

            // ===== BOMBE =====
            case 'bombe':
                if (!gameStates[sender].bombe) {
                    const bombe = Math.floor(Math.random() * 9) + 1;
                    gameStates[sender].bombe = { bombe: bombe, joueurs: [], tour: 0, termine: false };
                    await message.reply(
                        `💣 *Bombe*\n\nBombe cachée 1-9.\nRejoins : .bombe join\nJoue : .bombe jouer 1-9`
                    );
                } else if (args[1] === 'join') {
                    const b = gameStates[sender].bombe;
                    if (b.joueurs.includes(message.author)) {
                        await message.reply('❌ Déjà dans la partie.');
                        break;
                    }
                    b.joueurs.push(message.author);
                    await message.reply(`✅ ${message.author} a rejoint ! (${b.joueurs.length}/10)`);
                } else if (args[1] === 'jouer') {
                    const b = gameStates[sender].bombe;
                    if (b.termine) {
                        await message.reply('❌ Partie terminée.');
                        break;
                    }
                    const choix = parseInt(args[2]);
                    if (isNaN(choix) || choix < 1 || choix > 9) {
                        await message.reply('❌ Choisis 1-9.');
                        break;
                    }
                    const joueur = b.joueurs[b.tour % b.joueurs.length];
                    if (message.author !== joueur) {
                        await message.reply('❌ Pas ton tour.');
                        break;
                    }
                    if (choix === b.bombe) {
                        await message.reply(`💥 BOUM ! ${message.author} a perdu ! (case ${choix})`);
                        b.termine = true;
                        delete gameStates[sender].bombe;
                    } else {
                        const prochain = b.joueurs[(b.tour + 1) % b.joueurs.length];
                        await message.reply(`🔒 Case ${choix} sécurisée !\nAu tour de ${prochain}`);
                        b.tour++;
                    }
                }
                break;

            default:
                await message.reply(
                    `🎮 *Jeux*\n\n.imposteur_anime\n.defi\n.anagramme\n.morpion @user\n.bombe @user\n.repondre [rep]`
                );
        }
    }
};