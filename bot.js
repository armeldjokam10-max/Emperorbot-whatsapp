'use strict';

const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys');

const P = require('pino');
const fs = require('fs');
const path = require('path');

const config = require('./config');

async function startBot() {

    const { state, saveCreds } = await useMultiFileAuthState('./session');

    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: P({ level: 'silent' }),
        auth: state,
        printQRInTerminal: false,
        browser: ['EmperorBot', 'Chrome', '1.0.0']
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {

        const { connection, lastDisconnect } = update;

        if (connection === 'open') {
            console.log('=================================');
            console.log('✅ EmperorBot connecté !');
            console.log('=================================');
        }

        if (connection === 'close') {

            const shouldReconnect =
                lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

            console.log('Connexion fermée.');

            if (shouldReconnect) {
                startBot();
            }
        }
    });

    if (!sock.authState.creds.registered) {

        const number = process.env.PAIRING_NUMBER;

        if (!number) {
            console.log('PAIRING_NUMBER absent.');
            process.exit(0);
        }

        setTimeout(async () => {

            try {

                const code = await sock.requestPairingCode(number);

                console.log('');
                console.log('==============================');
                console.log('PAIRING CODE :');
                console.log(code);
                console.log('==============================');
                console.log('');

            } catch (e) {
                console.log('Impossible de générer le Pairing Code.');
                console.log(e.message);
            }

        }, 4000);

    }

    const commandsPath = path.join(__dirname, 'commands');

    if (fs.existsSync(commandsPath)) {

        fs.readdirSync(commandsPath)
            .filter(file => file.endsWith('.js'))
            .forEach(file => {

                try {

                    require(path.join(commandsPath, file));

                } catch (err) {

                    console.log(`Erreur commande : ${file}`);

                }

            });

    }

    sock.ev.on('messages.upsert', async ({ messages }) => {

        const msg = messages[0];

        if (!msg.message) return;

        if (msg.key.fromMe) return;

        // Ici seront appelées les commandes
        // Menu
        // Jeux
        // IA
        // YouTube
        // Lyrics
        // Groupes
        // etc.

    });

}

startBot();