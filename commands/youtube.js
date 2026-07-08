module.exports = {
    name: 'youtube',
    execute: async (message, args, client, prefix, config) => {
        const cmd = args[0].toLowerCase();
        const query = args.slice(1).join(' ');

        switch(cmd) {
            case 'play':
                if (!query) {
                    await message.reply(`❌ Utilisation : ${prefix}play [titre]`);
                    break;
                }
                if (config.youtubeApiKey === "TA_CLE_YOUTUBE") {
                    await message.reply(`🎵 "${query}"\n\n⚠️ Ajoute ta clé API YouTube dans config/config.js`);
                } else {
                    await message.reply(`🎵 Lecture de "${query}"...\n\n⏳ Audio YouTube (MP3)`);
                }
                break;

            case 'play2':
                if (!query) {
                    await message.reply(`❌ Utilisation : ${prefix}play2 [titre]`);
                    break;
                }
                await message.reply(`🔗 Lien YouTube : "${query}"`);
                break;

            case 'lyrics':
                if (!query) {
                    await message.reply(`❌ Utilisation : ${prefix}lyrics [titre]`);
                    break;
                }
                if (config.geniusApiKey === "TA_CLE_GENIUS") {
                    await message.reply(`🎵 Paroles de "${query}"\n\n⚠️ Ajoute ta clé API Genius dans config/config.js`);
                } else {
                    await message.reply(`🎵 Paroles de "${query}"...\n\n⏳ Recherche en cours...`);
                }
                break;

            case 'img':
                if (!query) {
                    await message.reply(`❌ Utilisation : ${prefix}img [mot-clé]`);
                    break;
                }
                await message.reply(`🖼️ Image : "${query}"`);
                break;

            case 'gif':
                if (!query) {
                    await message.reply(`❌ Utilisation : ${prefix}gif [mot-clé]`);
                    break;
                }
                await message.reply(`🎞️ GIF : "${query}"`);
                break;

            default:
                await message.reply(
                    `🎬 *YouTube & Images*\n\n${prefix}play [titre] - Audio YouTube\n${prefix}play2 [titre] - Lien YouTube\n${prefix}lyrics [titre] - Paroles\n${prefix}img [mot] - Image\n${prefix}gif [mot] - GIF`
                );
        }
    }
};