module.exports = {
    name: 'utilitaires',
    execute: async (message, args, client, prefix, utils) => {
        const cmd = args[0].toLowerCase();
        const config = utils.config;
        const botName = utils.botName;

        switch(cmd) {
            case 'ping':
                await message.reply(`🏓 Pong ! (${Date.now() - message.timestamp}ms)`);
                break;
            case 'info':
                await message.reply(
                    `🤖 *${botName} v${config.version}*\n\nCréateur : ${config.creator}\nCommandes : 60+\nJeux : 6\n.menu`
                );
                break;
            case 'menu':
            case 'help':
                await message.reply(
                    `📋 *MENU ${botName}*\n━━━━━━━━━━━━━━━━\n🎭 DIVERTISSEMENT\n.blague\n.citation\n.devinette\n.charade\n.poeme\n.priere\n━━━━━━━━━━━━━━━━\n🎭 FUN\n.love\n.compatibilite\n.aura\n.cap\n.actionverite\n.quiz\n━━━━━━━━━━━━━━━━\n🎮 JEUX\n.imposteur\n.defi\n.anagramme\n.morpion\n.bombe\n.repondre [rep]\n.histoire\n━━━━━━━━━━━━━━━━\n🎬 YOUTUBE & PAROLES\n.yt [titre]\n.video [titre]\n.photo [mot]\n.play [titre]\n.parole [titre]\n━━━━━━━━━━━━━━━━\n⚙️ GROUPE (Admin)\n.antilink\n.antimention\n.antiview\n.antivueunique\n.antitransfert\n.antipromote\n.antidemote\n.welcome\n.leave\n.mute @\n.unmute @\n.kick @\n.kickall\n.add +237...\n.promote @\n.demote @\n.grouplink\n.groupeinfo\n.autoreact\n.autoview\n.statut\n━━━━━━━━━━━━━━━━\n👑 ADMIN\n.sudo\n.addsudo +237...\n.rmsudo +237...\n━━━━━━━━━━━━━━━━\n.ping\n.info`
                );
                break;
            default:
                await message.reply(`❓ Commande inconnue. Tape .menu`);
        }
    }
};