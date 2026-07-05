const db = require('../database/reponses.js');

module.exports = {
    name: 'fun',
    execute: async (message, args, client, prefix, utils) => {
        const cmd = args[0].toLowerCase();
        const getRandom = utils.getRandom;

        switch(cmd) {
            case 'love':
                const love = Math.floor(Math.random() * 100) + 1;
                await message.reply(`💖 *Test d'amour*\n\nVotre compatibilité est de ${love}% !`);
                break;
            case 'compatibilite':
                const compat = Math.floor(Math.random() * 100) + 1;
                await message.reply(`💕 *Compatibilité*\n\nVotre compatibilité est de ${compat}% !`);
                break;
            case 'aura':
                await message.reply(`🌈 *Test d'aura*\n\nVotre aura est de couleur ${getRandom(db.couleursAura)} !`);
                break;
            case 'cap':
                const caps = ["Cap !", "Pas cap !", "Peut-être...", "Je tente !"];
                await message.reply(`🤔 *Cap ou pas cap ?*\n\n${getRandom(caps)}`);
                break;
            case 'actionverite':
                const choix = Math.random() < 0.5 ? db.actions : db.verites;
                await message.reply(`🎯 *Action ou Vérité*\n\n${getRandom(choix)}`);
                break;
            case 'quiz':
                const q = getRandom(db.questionsQuiz);
                utils.gameStates[message.from] = { quiz: q };
                await message.reply(`❓ *Quiz*\n\n${q.q}\n\nRéponds avec .repondre [ta réponse]`);
                break;
            default:
                await message.reply(
                    `🎭 *Fun*\n\n.love\n.compatibilite\n.aura\n.cap\n.actionverite\n.quiz`
                );
        }
    }
};