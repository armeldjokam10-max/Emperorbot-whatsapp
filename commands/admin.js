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
                await message.reply(`👑 SUDO\n\n${sudoList.join('\n')}`);
                break;
            case 'addsudo':
                const ns = args[1];
                if (!ns) {
                    await message.reply(`❌ Utilisation : .addsudo +237...`);
                    break;
                }
                if (!sudoList.includes(ns)) {
                    sudoList.push(ns);
                    await message.reply(`✅ ${ns} ajouté.`);
                } else {
                    await message.reply(`ℹ️ Déjà dans la liste.`);
                }
                break;
            case 'rmsudo':
                const rs = args[1];
                if (!rs) {
                    await message.reply(`❌ Utilisation : .rmsudo +237...`);
                    break;
                }
                const idx = sudoList.indexOf(rs);
                if (idx !== -1) {
                    sudoList.splice(idx, 1);
                    await message.reply(`✅ ${rs} retiré.`);
                } else {
                    await message.reply(`ℹ️ Pas dans la liste.`);
                }
                break;
            default:
                await message.reply(
                    `👑 *Admin*\n\n.sudo\n.addsudo +237...\n.rmsudo +237...`
                );
        }
    }
};