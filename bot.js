const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  Browsers
} = require("@whiskeysockets/baileys");

const pino = require("pino");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const config = require("./config/config.js");

const SESSION_DIR = path.join(__dirname, "session");

async function demanderNumero() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const numero = await new Promise((resolve) => {
    rl.question(
      "📱 Entre ton numéro WhatsApp avec indicatif, sans + : ",
      resolve
    );
  });

  rl.close();

  return numero.replace(/\D/g, "");
}

async function demarrer() {
  if (!fs.existsSync(SESSION_DIR)) {
    fs.mkdirSync(SESSION_DIR, { recursive: true });
  }

  const { state, saveCreds } =
    await useMultiFileAuthState(SESSION_DIR);

  const sock = makeWASocket({
    auth: state,
    browser: Browsers.ubuntu("Chrome"),
    printQRInTerminal: false,
    logger: pino({ level: "silent" })
  });

  sock.ev.on("creds.update", saveCreds);

  if (!state.creds.registered) {
    try {
      const numero = await demanderNumero();

      if (!numero) {
        console.log("❌ Numéro invalide.");
        process.exit(1);
      }

      console.log("⏳ Génération du pairing code...");

      const code = await sock.requestPairingCode(numero);

      console.log("");
      console.log("╔══════════════════════════════╗");
      console.log("║      👑 EMPERORBOT           ║");
      console.log("╠══════════════════════════════╣");
      console.log(`║ 🔑 CODE : ${code}`);
      console.log("╚══════════════════════════════╝");
      console.log("");
      console.log(
        "WhatsApp → Paramètres → Appareils connectés → Connecter un appareil"
      );
      console.log("Puis entre le code affiché.");
    } catch (error) {
      console.error("❌ Erreur pairing :", error.message);
    }
  }

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log("");
      console.log("╔══════════════════════════════╗");
      console.log("║   ✅ EMPERORBOT CONNECTÉ     ║");
      console.log("╚══════════════════════════════╝");
      console.log("");
    }

    if (connection === "close") {
      const code =
        lastDisconnect?.error?.output?.statusCode;

      if (code === DisconnectReason.loggedOut) {
        console.log("❌ Session déconnectée.");
        console.log("Supprime le dossier session puis reconnecte.");
      } else {
        console.log("⚠️ Connexion fermée.");
        console.log("🔄 Nouvelle tentative...");
        setTimeout(demarrer, 5000);
      }
    }
  });

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const message = messages[0];

    if (!message?.message) return;
    if (message.key.fromMe) return;

    const texte =
      message.message.conversation ||
      message.message.extendedTextMessage?.text ||
      "";

    if (!texte) return;

    console.log(
      `📩 Message reçu : ${texte}`
    );

    if (texte.toLowerCase() === `${config.PREFIX}ping`) {
      await sock.sendMessage(message.key.remoteJid, {
        text: "🏓 Pong ! EmperorBot est actif. 👑"
      });
    }
  });
}

demarrer();