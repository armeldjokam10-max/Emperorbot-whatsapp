const config = require("../config/config");
const commands = require("../commands");

module.exports = async (sock, m) => {

    try {

        const msg = m.messages[0];

        if (!msg.message) return;

        if (msg.key.fromMe) return;

        const from = msg.key.remoteJid;

        const sender =
            msg.key.participant || from;

        const body =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            msg.message.imageMessage?.caption ||
            msg.message.videoMessage?.caption ||
            "";

        if (!body.startsWith(config.prefix)) return;

        const args =
            body.slice(config.prefix.length)
            .trim()
            .split(/ +/);

        const commandName =
            args.shift().toLowerCase();

        const command =
            commands.get(commandName);

        if (!command) return;

        await command.execute({
            sock,
            msg,
            from,
            sender,
            args,
            config
        });

    } catch (err) {

        console.log("Erreur Handler :", err);

    }

};