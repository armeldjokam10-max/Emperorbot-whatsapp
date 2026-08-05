module.exports = (msg) => {

    const type =
        Object.keys(msg.message || {})[0];

    return {
        id: msg.key.id,

        chat: msg.key.remoteJid,

        sender:
            msg.key.participant ||
            msg.key.remoteJid,

        type,

        text:
            msg.message?.conversation ||
            msg.message?.extendedTextMessage?.text ||
            ""
    };

};