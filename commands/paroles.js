module.exports = {
    name: 'paroles',
    execute: async (message, args, client, prefix, config) => {
        const cmd = args[0].toLowerCase();
        const song = args.slice(1).join(' ');

        switch(cmd) {
            case 'parole':
            case 'lyrics':
                if (!song) {
                    await message.reply(`❌ Utilisation : ${prefix}parole [titre]`);
                    break;
                }
                if (config.geniusApiKey === "TA_CLE_GENIUS") {
                    await message.reply(`🎵 Paroles de "${song}"\n\n⚠️ Ajoute ta clé API Genius dans config/config.js`);
                } else {
                    await message.reply(`🎵 Paroles de "${song}"...\n\n⏳ Recherche en cours...`);
                }
                break;

            default:
                await message.reply(
                    `🎵 *Paroles*\n\n${prefix}parole [titre] - Chercher les paroles\n${prefix}lyrics [titre] - Chercher les paroles`
                );
        }
    }
};