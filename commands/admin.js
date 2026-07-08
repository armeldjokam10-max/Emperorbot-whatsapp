module.exports = {
    name: 'admin',
    execute: async (message, args, client, prefix, utils) => {
        if (!utils.isSudo(message.from)) {
            await message.reply('❌ Non autorisé.');
            return;
        }

        const cmd = args[0].toLowerCase();
        const sudoList = utils.sudoList;

        switch(cmd) {
            case 'sudo':
                await message.reply(`👑 *SUDO List*\n\n${sudoList.join('\n')}`);
                break;

            case 'addsudo':
                const ns = args[1];
                if (!ns) {
                    await message.reply(`❌ Utilisation : ${prefix}addsudo +237...`);
                    break;
                }
                if (!sudoList.includes(ns)) {
                    sudoList.push(ns);
                    await message.reply(`✅ ${ns} ajouté aux SUDO.`);
                } else {
                    await message.reply(`ℹ️ ${ns} est déjà dans la liste.`);
                }
                break;

            case 'rmsudo':
                const rs = args[1];
                if (!rs) {
                    await message.reply(`❌ Utilisation : ${prefix}rmsudo +237...`);
                    break;
                }
                const index = sudoList.indexOf(rs);
                if (index !== -1) {
                    sudoList.splice(index, 1);
                    await message.reply(`✅ ${rs} retiré des SUDO.`);
                } else {
                    await message.reply(`ℹ️ ${rs} n'est pas dans la liste.`);
                }
                break;

            default:
                await message.reply(
                    `👑 *Admin*\n\n${prefix}sudo - Liste SUDO\n${prefix}addsudo +237... - Ajouter SUDO\n${prefix}rmsudo +237... - Retirer SUDO`
                );
        }
    }
};