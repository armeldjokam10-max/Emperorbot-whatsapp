const db = require('../database/reponses.js');

module.exports = {
    name: 'divertissement',
    execute: async (message, args, client, prefix, utils) => {
        const cmd = args[0].toLowerCase();
        const getRandom = utils.getRandom;

        switch(cmd) {
            case 'blague':
                await message.reply(`😄 ${getRandom(db.blagues)}`);
                break;
            case 'citation':
                await message.reply(`💬 ${getRandom(db.citations)}`);
                break;
            case 'devinette':
                await message.reply(`🧩 ${getRandom(db.devinettes)}`);
                break;
            case 'charade':
                await message.reply(`🎭 ${getRandom(db.charades)}`);
                break;
            case 'priere':
                await message.reply(`🙏 ${getRandom(db.prieres)}`);
                break;
            case 'poeme':
                const p = getRandom(db.poemes);
                await message.reply(`📖 *${p.titre}*\n\n${p.contenu}`);
                break;
            default:
                await message.reply(
                    `🎭 *Divertissement*\n\n.blague\n.citation\n.devinette\n.charade\n.poeme\n.priere`
                );
        }
    }
};