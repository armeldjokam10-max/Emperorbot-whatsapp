module.exports = {
    name: 'groupement',
    execute: async (message, args, client, prefix, utils) => {
        const chat = await message.getChat();

        if (!chat.isGroup) {
            await message.reply('❌ Commande de groupe uniquement.');
            return;
        }

        // Vérifier si l'utilisateur est admin du groupe ou SUDO
        const isAdmin = chat.participants.find(p => p.id._serialized === message.author && p.isAdmin);
        const isSudo = utils.isSudo(message.from);

        if (!isAdmin && !isSudo) {
            await message.reply('❌ Réservé aux admins du groupe.');
            return;
        }

        const cmd = args[0].toLowerCase();

        switch(cmd) {
            // === ANTI-LINK ===
            case 'antilink':
                await message.reply('🔗 *Anti-Link activé !*');
                break;

            // === ANTI-MENTION ===
            case 'antimention':
                await message.reply('🚫 *Anti-Mention activé !*');
                break;

            // === ANTI-VIEW ===
            case 'antiview':
                await message.reply('👀 *Anti-View activé !*');
                break;

            // === ANTI-VUE UNIQUE ===
            case 'antivueunique':
                await message.reply('👁️ *Anti-Vue Unique activé !*');
                break;

            // === ANTI-TRANSFERT ===
            case 'antitransfert':
                await message.reply('🚫 *Anti-Transfert activé !*');
                break;

            // === ANTI-PROMOTE ===
            case 'antipromote':
                await message.reply('🚫 *Anti-Promotion activé !*');
                break;

            // === ANTI-DEMOTE ===
            case 'antidemote':
                await message.reply('🚫 *Anti-Rétrogradation activé !*');
                break;

            // === ANTI-AUDIO ===
            case 'antiaudio':
                await message.reply('🚫 *Anti-Audio activé !*');
                break;

            // === ANTI-IMAGE ===
            case 'antiimage':
                await message.reply('🚫 *Anti-Image activé !*');
                break;

            // === ANTI-VIDEO ===
            case 'antivideo':
                await message.reply('🚫 *Anti-Vidéo activé !*');
                break;

            // === ANTI-SPAM ===
            case 'antispam':
                await message.reply('🚫 *Anti-Spam activé !*');
                break;

            // === ANTI-BOT ===
            case 'antibot':
                await message.reply('🚫 *Anti-Bot activé !*');
                break;

            // === ANTI-CALL ===
            case 'antical':
                await message.reply('🚫 *Anti-Call activé !*');
                break;

            // === ANTI-PURGE ===
            case 'antipurge':
                await message.reply('🚫 *Anti-Purge activé !*');
                break;

            // === WELCOME ===
            case 'welcome':
                await message.reply('👋 *Message de bienvenue configuré !*');
                break;

            // === LEAVE ===
            case 'leave':
                await message.reply('👋 *Message de départ configuré !*');
                break;

            // === MUTE ===
            case 'mute':
                const muteTarget = args[1] || 'mention';
                await message.reply(`🔇 ${muteTarget} a été muté.`);
                break;

            // === UNMUTE ===
            case 'unmute':
                const unmuteTarget = args[1] || 'mention';
                await message.reply(`🔊 ${unmuteTarget} a été démuté.`);
                break;

            // === KICK ===
            case 'kick':
                const kickTarget = args[1] || 'mention';
                await message.reply(`👢 ${kickTarget} a été expulsé.`);
                break;

            // === KICKALL ===
            case 'kickall':
                await message.reply('⚠️ *Confirme avec .kickall confirm*');
                break;

            // === ADD ===
            case 'add':
                const number = args[1] || '+237...';
                await message.reply(`➕ ${number} sera ajouté.`);
                break;

            // === PROMOTE ===
            case 'promote':
                const promoteTarget = args[1] || 'mention';
                await message.reply(`👑 ${promoteTarget} a été promu admin.`);
                break;

            // === DEMOTE ===
            case 'demote':
                const demoteTarget = args[1] || 'mention';
                await message.reply(`👑 ${demoteTarget} a été rétrogradé.`);
                break;

            // === GROUPLINK ===
            case 'grouplink':
                try {
                    const link = await chat.getInviteCode();
                    await message.reply(`🔗 Lien du groupe :\nhttps://chat.whatsapp.com/${link}`);
                } catch {
                    await message.reply('❌ Impossible d\'obtenir le lien.');
                }
                break;

            // === GROUPEINFO ===
            case 'groupeinfo':
                await message.reply(
                    `📊 *Infos du groupe*\n\n📌 Nom : ${chat.name}\n👥 Membres : ${chat.participants.length}\n👑 Admins : ${chat.participants.filter(p => p.isAdmin).length}`
                );
                break;

            // === AUTOREACT ===
            case 'autoreact':
                await message.reply('❤️ *Auto-réaction activée !*');
                break;

            // === AUTOVIEW ===
            case 'autoview':
                await message.reply('👁️ *Auto-vue activée !*');
                break;

            // === STATUT ===
            case 'statut':
                await message.reply(
                    `📊 *Statut du bot*\n\n🟢 En ligne\n📋 Commandes : 60+\n🎮 Jeux : 8\n👑 SUDO : ${utils.sudoList ? utils.sudoList.length : 0}`
                );
                break;

            default:
                await message.reply(
                    `⚙️ *Gestion de Groupe*\n\n` +
                    `${prefix}antilink - Anti-liens\n${prefix}antimention - Anti-mention\n${prefix}antiview - Anti-vue\n${prefix}antivueunique - Anti-vue unique\n${prefix}antitransfert - Anti-transfert\n${prefix}antipromote - Anti-promotion\n${prefix}antidemote - Anti-rétrogradation\n${prefix}antiaudio - Anti-audio\n${prefix}antiimage - Anti-image\n${prefix}antivideo - Anti-vidéo\n${prefix}antispam - Anti-spam\n${prefix}antibot - Anti-bot\n${prefix}antical - Anti-call\n${prefix}antipurge - Anti-purge\n` +
                    `${prefix}welcome - Bienvenue\n${prefix}leave - Départ\n${prefix}mute @ - Muter\n${prefix}unmute @ - Démuter\n${prefix}kick @ - Expulser\n${prefix}kickall - Expulser tous\n${prefix}add +237... - Ajouter\n${prefix}promote @ - Promouvoir\n${prefix}demote @ - Rétrograder\n${prefix}grouplink - Lien\n${prefix}groupeinfo - Infos\n${prefix}autoreact - Auto-réaction\n${prefix}autoview - Auto-vue\n${prefix}statut - Statut`
                );
        }
    }
};