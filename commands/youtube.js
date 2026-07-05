module.exports = {
    name: 'youtube',
    execute: async (message, args, client, prefix, config) => {
        const cmd = args[0].toLowerCase();
        const query = args.slice(1).join(' ');

        switch(cmd) {
            case 'yt':
            case 'youtube':
                if (!query) {
                    await message.reply(`❌ Utilisation : .yt [titre]`);
                    break;
                }
                if (config.youtubeApiKey === "TA_CLE_YOUTUBE") {
                    await message.reply(`🔍 YouTube : "${query}"\n\n⚠️ Ajoute ta clé API YouTube dans config/config.js`);
                } else {
                    await message.reply(`🔍 YouTube : "${query}"\n\n⏳ Recherche avec ta clé API.`);
                }
                break;
            case 'video':
                if (!query) {
                    await message.reply(`❌ Utilisation : .video [titre]`);
                    break;
                }
                await message.reply(`🎬 Vidéo : "${query}"`);
                break;
            case 'photo':
                if (!query) {
                    await message.reply(`❌ Utilisation : .photo [mot]`);
                    break;
                }
                await message.reply(`🖼️ Image : "${query}"`);
                break;
            case 'play':
                if (!query) {
                    await message.reply(`❌ Utilisation : .play [titre]`);
                    break;
                }
                await message.reply(`▶️ Lecture de "${query}"...`);
                break;
            default:
                await message.reply(
                    `🎬 *YouTube*\n\n.yt [titre]\n.video [titre]\n.photo [mot]\n.play [titre]`
                );
        }
    }
};