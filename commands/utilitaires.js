module.exports = {
    name: 'utilitaires',
    execute: async (message, args, client, prefix, utils) => {
        const cmd = args[0].toLowerCase();
        const config = utils.config;
        const botName = utils.botName;

        // Mode Public/Privé
        let isPublic = false;

        switch(cmd) {
            case 'ping':
                await message.reply(`🏓 Pong ! (${Date.now() - message.timestamp}ms)`);
                break;

            case 'info':
                await message.reply(
                    `🤖 *${botName} v${config.version}*\n\n` +
                    `👑 Créé par Petit Empereur\n` +
                    `📞 Contact : +237 6 51 53 91 95\n` +
                    `📌 Mode : ${isPublic ? 'Public' : 'Privé'}\n` +
                    `📊 Commandes : 60+\n` +
                    `🎮 Jeux : 8\n` +
                    `📋 ${prefix}menu`
                );
                break;

            case 'public':
                if (!utils.isSudo(message.from)) {
                    await message.reply('❌ Seul le créateur peut changer ce paramètre.');
                    break;
                }
                isPublic = true;
                await message.reply('🌍 *Mode Public activé !* Tout le monde peut utiliser le bot.');
                break;

            case 'private':
                if (!utils.isSudo(message.from)) {
                    await message.reply('❌ Seul le créateur peut changer ce paramètre.');
                    break;
                }
                isPublic = false;
                await message.reply('🔒 *Mode Privé activé !* Seul le créateur peut utiliser le bot.');
                break;

            case 'vv':
                if (!utils.isSudo(message.from)) {
                    await message.reply('❌ Seul le créateur peut utiliser cette commande.');
                    break;
                }
                await message.reply('👁️ Vues uniques supprimées !');
                break;

            case 'prefix':
                if (!utils.isSudo(message.from)) {
                    await message.reply('❌ Seul le créateur peut changer le préfixe.');
                    break;
                }
                const newPrefix = args[1];
                if (!newPrefix) {
                    await message.reply(`❌ Utilisation : ${prefix}prefix !`);
                    break;
                }
                utils.config.prefix = newPrefix;
                await message.reply(`✅ Préfixe changé en : ${newPrefix}`);
                break;

            case 'contact':
                await message.reply(
                    `📞 *Contact*\n\n` +
                    `👑 Créateur : Petit Empereur\n` +
                    `📱 Téléphone : +237 6 51 53 91 95\n` +
                    `📢 Chaîne : https://whatsapp.com/channel/0029VbCjCnbInlqKlXizZO0k\n` +
                    `👥 Groupe : https://chat.whatsapp.com/Jem0AxvaLCr1xgo4dCfa71\n` +
                    `💬 Discord : https://discord.gg/jJSVhjEtX`
                );
                break;

            case 'menu':
            case 'help':
                await message.reply(
                    `📋 *MENU ${botName}*\n` +
                    `👑 Créé par Petit Empereur\n` +
                    `📞 +237 6 51 53 91 95\n` +
                    `━━━━━━━━━━━━━━━━\n` +
                    `🎭 DIVERTISSEMENT\n` +
                    `${prefix}blague - Blague aléatoire\n` +
                    `${prefix}citation - Citation\n` +
                    `${prefix}devinette - Devinette\n` +
                    `${prefix}charade - Charade\n` +
                    `${prefix}poeme - Poème\n` +
                    `${prefix}priere - Prière\n` +
                    `${prefix}proverbe - Proverbe\n` +
                    `${prefix}histoire - Histoire\n` +
                    `━━━━━━━━━━━━━━━━\n` +
                    `🎮 JEUX MULTIJOUEURS\n` +
                    `${prefix}imposteur_anime - Imposteur (5 rounds)\n` +
                    `${prefix}morpion @user - Morpion (2 joueurs)\n` +
                    `${prefix}bombe @user - Bombe (2 joueurs)\n` +
                    `${prefix}anagramme - Anagramme\n` +
                    `${prefix}defi - Défi\n` +
                    `━━━━━━━━━━━━━━━━\n` +
                    `🎵 MUSIQUE & IMAGES\n` +
                    `${prefix}play [titre] - Audio YouTube\n` +
                    `${prefix}play2 [titre] - Lien YouTube\n` +
                    `${prefix}lyrics [titre] - Paroles\n` +
                    `${prefix}img [mot] - Image\n` +
                    `${prefix}gif [mot] - GIF\n` +
                    `━━━━━━━━━━━━━━━━\n` +
                    `⚙️ GROUPE (Admins)\n` +
                    `${prefix}antilink - Anti-liens\n` +
                    `${prefix}antimention - Anti-mention\n` +
                    `${prefix}antiview - Anti-vue\n` +
                    `${prefix}antivueunique - Anti-vue unique\n` +
                    `${prefix}antitransfert - Anti-transfert\n` +
                    `${prefix}antipromote - Anti-promotion\n` +
                    `${prefix}antidemote - Anti-rétrogradation\n` +
                    `${prefix}antiaudio - Anti-audio\n` +
                    `${prefix}antiimage - Anti-image\n` +
                    `${prefix}antivideo - Anti-vidéo\n` +
                    `${prefix}antispam - Anti-spam\n` +
                    `${prefix}antibot - Anti-bot\n` +
                    `${prefix}antical - Anti-call\n` +
                    `${prefix}antipurge - Anti-purge\n` +
                    `${prefix}welcome - Bienvenue\n` +
                    `${prefix}leave - Départ\n` +
                    `${prefix}mute @ - Muter\n` +
                    `${prefix}unmute @ - Démuter\n` +
                    `${prefix}kick @ - Expulser\n` +
                    `${prefix}kickall - Expulser tous\n` +
                    `${prefix}add +237... - Ajouter\n` +
                    `${prefix}promote @ - Promouvoir\n` +
                    `${prefix}demote @ - Rétrograder\n` +
                    `${prefix}grouplink - Lien du groupe\n` +
                    `${prefix}groupeinfo - Infos du groupe\n` +
                    `${prefix}autoreact - Auto-réaction\n` +
                    `${prefix}autoview - Auto-vue\n` +
                    `${prefix}statut - Statut du bot\n` +
                    `━━━━━━━━━━━━━━━━\n` +
                    `👑 ADMIN (Créateur)\n` +
                    `${prefix}sudo - Liste SUDO\n` +
                    `${prefix}addsudo +237... - Ajouter SUDO\n` +
                    `${prefix}rmsudo +237... - Retirer SUDO\n` +
                    `${prefix}public - Mode public\n` +
                    `${prefix}private - Mode privé\n` +
                    `${prefix}vv - Enlever les vues\n` +
                    `${prefix}prefix ! - Changer préfixe\n` +
                    `━━━━━━━━━━━━━━━━\n` +
                    `${prefix}ping - Test\n` +
                    `${prefix}info - Infos\n` +
                    `${prefix}contact - Contact\n` +
                    `━━━━━━━━━━━━━━━━\n` +
                    `📢 Chaîne : https://whatsapp.com/channel/0029VbCjCnbInlqKlXizZO0k\n` +
                    `👥 Groupe : https://chat.whatsapp.com/Jem0AxvaLCr1xgo4dCfa71\n` +
                    `💬 Discord : https://discord.gg/jJSVhjEtX\n` +
                    `━━━━━━━━━━━━━━━━\n` +
                    `👑 Créé par Petit Empereur`
                );
                break;

            default:
                await message.reply(`❓ Commande inconnue. Tape ${prefix}menu`);
        }
    }
};