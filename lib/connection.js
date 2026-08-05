const {
    default: makeWASocket,
    useMultiFileAuthState,
    fetchLatestBaileysVersion,
    DisconnectReason
} = require("@whiskeysockets/baileys");

const P = require("pino");
const { Boom } = require("@hapi/boom");
const chalk = require("chalk");

const config = require("../config/config");
const messageHandler = require("./handler");

async function startConnection() {

    const { state, saveCreds } =
        await useMultiFileAuthState("./session");

    const { version } =
        await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        auth: state,
        version,
        logger: P({ level: "silent" }),
        browser: ["EmperorBot", "Chrome", "1.0.0"]
    });

    sock.ev.on("creds.update", saveCreds);

    if (!sock.authState.creds.registered) {

        const code =
            await sock.requestPairingCode(
                config.pairingNumber
            );

        console.log(
            chalk.green("\n===== PAIRING CODE =====")
        );

        console.log(
            chalk.yellow(code)
        );

        console.log(
            chalk.green("========================\n")
        );
    }

    sock.ev.on("connection.update",
        async ({ connection, lastDisconnect }) => {

            if (connection === "open") {

                console.log(
                    chalk.green("✅ EmperorBot connecté.")
                );

            }

            if (connection === "close") {

                const reason =
                    new Boom(lastDisconnect?.error)
                    .output.statusCode;

                if (reason !== DisconnectReason.loggedOut) {

                    console.log(
                        chalk.yellow("🔄 Reconnexion...")
                    );

                    startConnection();

                } else {

                    console.log(
                        chalk.red("Session supprimée.")
                    );

                }

            }

        });

    sock.ev.on("messages.upsert",
        async (m) => {

            await messageHandler(sock, m);

        });

    return sock;

}

module.exports = startConnection;