const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  Browsers
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const fs = require("fs");
const path = require("path");

const config = require("./config/config.js");

const SESSION_DIR = path.join(__dirname, "session");

async function startBot() {
  try {
    if (!fs.existsSync(SESSION_DIR)) {
      fs.mkdirSync(SESSION_DIR, { recursive: true });
    }

    const { state, saveCreds } =
      await useMultiFileAuthState(SESSION_DIR);

    const sock = makeWASocket({
      auth: state,
      browser: Browsers.ubuntu("EmperorBot"),
      printQRInTerminal: false,
      logger: pino({ level: "silent" })
    });

    sock.ev.on("creds.update", saveCreds);

    /*
     * PREMIÈRE CONNEXION
     * Le numéro sera fourni par la variable PAIRING_NUMBER
     * dans l'environnement de l'hébergeur.
     */
    if (!state.creds.registered) {
      const number = process.env.PAIRING_NUMBER;

      if (!number) {
        console.log("❌ PAIRING_NUMBER manquant.");
        console.log(
          "Ajoute PAIRING_NUMBER dans les variables d'environnement de l'hébergeur."
        );
        return;
      }

      const cleanNumber = number.replace(/\D/g, "");

      if (!cleanNumber) {
        console.log("❌ PAIRING_NUMBER invalide.");
        return;
      }

      console.log("⏳ Génération du pairing code...");

      try {
        const code = await sock.requestPairingCode(cleanNumber);

        console.log("");
        console.log("====================================");
        console.log("👑 EMPERORBOT");
        console.log("🔐 PAIRING CODE");
        console.log("");
        console.log(code);
        console.log("");
        console.log("WhatsApp → Appareils connectés");
        console.log("→ Connecter un appareil");
        console.log("→ Entrer le code affiché");
        console.log("====================================");
        console.log("");
      } catch (error) {
        console.error(
          "❌ Impossible de générer le pairing code :",
          error.message
        );
        return;
      }
    }

    sock.ev.on(
      "connection.update",
      async ({ connection, lastDisconnect }) => {
        if (connection === "connecting") {
          console.log("⏳ Connexion à WhatsApp...");
        }

        if (connection === "open") {
          console.log("");
          console.log("====================================");
          console.log("✅ EMPERORBOT CONNECTÉ À WHATSAPP");
          console.log("👑 Bot : " + config.BOT_NAME);
          console.log("👤 Créateur : " + config.OWNER_NAME);
          console.log("====================================");
          console.log("");
        }

        if (connection === "close") {
          const statusCode =
            lastDisconnect?.error?.output?.statusCode;

          if (statusCode === DisconnectReason.loggedOut) {
            console.log("❌ Session WhatsApp déconnectée.");
            console.log(
              "Supprime la session puis effectue un nouveau pairing."
            );
            return;
          }

          console.log("⚠️ Connexion interrompue.");
          console.log("🔄 Reconnexion dans 5 secondes...");

          setTimeout(() => {
            startBot();
          }, 5000);
        }
      }
    );

    /*
     * PREMIÈRE COMMANDE DE TEST
     * Elle nous permet de vérifier que le moteur fonctionne
     * avant d'ajouter toutes les autres commandes.
     */
    sock.ev.on("messages.upsert", async ({ messages }) => {
      try {
        const message = messages[0];

        if (!message?.message) return;
        if (message.key.fromMe) return;

        const jid = message.key.remoteJid;

        const text =
          message.message.conversation ||
          message.message.extendedTextMessage?.text ||
          "";

        if (!text) return;

        const command = text.trim().toLowerCase();

        if (command === `${config.PREFIX}ping`) {
          await sock.sendMessage(jid, {
            text:
              "🏓 Pong !\n\n" +
              "👑 EmperorBot est actif.\n" +
              `🤖 Version : ${config.VERSION || "1.0.0"}`
          });
        }
      } catch (error) {
        console.error(
          "❌ Erreur message :",
          error.message
        );
      }
    });
  } catch (error) {
    console.error(
      "❌ Erreur de démarrage :",
      error.message
    );

    setTimeout(() => {
      startBot();
    }, 5000);
  }
}

console.log("====================================");
console.log("👑 EMPERORBOT WHATSAPP");
console.log("🚀 Démarrage...");
console.log("====================================");

startBot();