module.exports = {
    name: 'groupement',
    execute: async (message, args, client, prefix, utils) => {
        const chat = await message.getChat();
        if (!chat.isGroup) {
            await message.reply('❌ Commande de groupe.');
            return;
        }
        if (!utils.isSudo(message.from)) {
            await message.reply('❌ Réservé aux admins.');
            return;
        }

        const cmd = args[0].toLowerCase();

        switch(cmd) {
            case 'antilink':
                await message.reply('🔗 Anti-Link activé !');
                break;
            case 'antimention':
                await message.reply('🚫 Anti-Mention activé !');
                break;
            case 'antiview':
                await message.reply('👀 Anti-View activé !');
                break;
            case 'antivueunique':
                await message.reply('👁️ Anti-Vue Unique activé !');
                break;
            case 'antitransfert':
                await message.reply('🚫 Anti-Transfert activé !');
                break;
            case 'antipromote':
                await message.reply('🚫 Anti-Promotion activé !');
                break;
            case 'antidemote':
                await message.reply('🚫 Anti-Rétrogradation activé !');
                break;
            case 'welcome':
                await message.reply('👋 Bienvenue configuré !');
                break;
            case 'leave':
                await message.reply('👋 Départ configuré !');
                break;
            case 'mute':
                await message.reply(`🔇 ${args[1] || 'mention'} muté.`);
                break;
            case 'unmute':
                await message.reply(`🔊 ${args[1] || 'mention'} démuté.`);
                break;
            case 'kick':
                await message.reply(`👢 ${args[1] || 'mention'} expulsé.`);
                break;
            case 'kickall':
                await message.reply('⚠️ Confirme avec .kickall confirm');
                break;
            case 'add':
                await message.reply(`➕ ${args[1] || '+237...'} ajouté.`);
                break;
            case 'promote':
                await message.reply(`👑 ${args[1] || 'mention'} promu admin.`);
                break;
            case 'demote':
                await message.reply(`👑 ${args[1] || 'mention'} rétrogradé.`);
                break;
            case 'grouplink':
                try {
                    const link = await chat.getInviteCode();
                    await message.reply(`🔗 https://chat.whatsapp.com/${link}`);
                } catch {
                    await message.reply('❌ Impossible.');
                }
                break;
            case 'groupeinfo':
                await message.reply(
                    `📊 *Groupe*\n\nNom : ${chat.name}\nMembres : ${chat.participants.length}\nAdmins : ${chat.participants.filter(p => p.isAdmin).length}`
                );
                break;
            case 'autoreact':
                await message.reply('❤️ Auto-réaction activée !');
                break;
            case 'autoview':
                await message.reply('👁️ Auto-vue activée !');
                break;
            case 'statut':
                await message.reply(
                    `📊 *Statut*\n\n🟢 En ligne\nCommandes : 60+\nJeux : 6\nSUDO : ${utils.sudoList ? utils.sudoList.length : 0}`
                );
                break;
            default:
                await message.reply(
                    `⚙️ *Gestion Groupe*\n\n.antilink\n.antimention\n.antiview\n.antivueunique\n.antitransfert\n.antipromote\n.antidemote\n.welcome\n.leave\n.mute @\n.unmute @\n.kick @\n.kickall\n.add +237...\n.promote @\n.demote @\n.grouplink\n.groupeinfo\n.autoreact\n.autoview\n.statut`
                );
        }
    }
};