require("dotenv").config();

const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const { Boom } = require("@hapi/boom");
const pino = require("pino");
const chalk = require("chalk");

const config = require("./config/config");
const commands = require("./commands");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");

  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: pino({ level: "silent" }),
    printQRInTerminal: false,
    browser: ["EmperorBot", "Chrome", "1.0.0"]
  });

  sock.ev.on("creds.update", saveCreds);

  if (!sock.authState.creds.registered) {
    const code = await sock.requestPairingCode(config.pairingNumber);

    console.log(chalk.green("================================"));
    console.log(chalk.yellow("PAIRING CODE"));
    console.log(chalk.cyan(code));
    console.log(chalk.green("================================"));
  }

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "open") {
      console.log(chalk.green("✓ EmperorBot connecté avec succès."));
    }

    if (connection === "close") {
      const statusCode =
        new Boom(lastDisconnect?.error)?.output?.statusCode;

      if (statusCode !== DisconnectReason.loggedOut) {
        console.log(chalk.yellow("Reconnexion..."));
        startBot();
      } else {
        console.log(chalk.red("Session déconnectée."));
      }
    }
  });
  sock.ev.on("messages.upsert", async ({ messages }) => {
    try {
      const msg = messages[0];
      if (!msg.message) return;

      const from = msg.key.remoteJid;
      const sender = msg.key.participant || msg.key.remoteJid;

      const body =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text ||
        msg.message.imageMessage?.caption ||
        msg.message.videoMessage?.caption ||
        "";

      const prefix = config.prefix;

      if (!body.startsWith(prefix)) return;

      const args = body.slice(prefix.length).trim().split(/ +/);
      const commandName = args.shift().toLowerCase();

      const command = commands.get(commandName);

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
      console.log(chalk.red("Erreur commande :"), err);
    }
  });

  return sock;
}

startBot().catch(console.error);