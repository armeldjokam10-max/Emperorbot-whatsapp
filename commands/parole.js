module.exports = {
    name: 'paroles',
    execute: async (message, args, client, prefix, config) => {
        const cmd = args[0].toLowerCase();
        const song = args.slice(1).join(' ');

        switch(cmd) {
            case 'parole':
            case 'lyrics':
                if (!song) {
                    await message.reply(`❌ Utilisation : .parole [titre]`);
                    break;
                }
                if (config.geniusApiKey === "TA_CLE_GENIUS") {
                    await message.reply(`🎵 Paroles de "${song}"\n\n⚠️ Ajoute ta clé API Genius dans config/config.js`);
                } else {
                    await message.reply(`🎵 Paroles de "${song}"\n\n⏳ Recherche avec ta clé API.`);
                }
                break;
            default:
                await message.reply(
                    `🎵 *Paroles*\n\n.parole [titre]\n.lyrics [titre]`
                );
        }
    }
};