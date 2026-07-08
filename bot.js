const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const config = require('./config/config.js');

const prefix = config.prefix;
const botName = config.botName;
let sudoList = config.sudoList;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

const gameStates = {};
let lastIndexes = {};

function getRandom(array) {
    if (!array || array.length === 0) return null;
    let randomIndex;
    let attempts = 0;
    do {
        randomIndex = Math.floor(Math.random() * array.length);
        attempts++;
    } while (randomIndex === lastIndexes[array] && array.length > 1 && attempts < 10);
    lastIndexes[array] = randomIndex;
    return array[randomIndex];
}

function isSudo(number) {
    return sudoList.includes(number);
}

// Chargement des commandes
const commands = {};
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands[command.name] = command;
    console.log(`✅ Commande chargée : ${command.name}`);
}

// Gestion des messages
client.on('message', async message => {
    if (!message.body.startsWith(prefix)) return;

    const args = message.body.slice(prefix.length).trim().split(/\s+/);
    const commandName = args[0].toLowerCase();

    try {
        const utils = {
            isSudo,
            sudoList,
            config,
            botName,
            getRandom,
            gameStates
        };

        switch(commandName) {
            // ===== DIVERTISSEMENT =====
            case 'blague':
            case 'citation':
            case 'devinette':
            case 'charade':
            case 'poeme':
            case 'priere':
            case 'histoire':
            case 'proverbe':
                await commands['divertissement'].execute(message, args, client, prefix, utils);
                break;

            // ===== FUN =====
            case 'love':
            case 'lovetest':
            case 'compatibilite':
            case 'aura':
            case 'cap':
            case 'capoupascap':
            case 'actionverite':
            case 'anniversaire':
                await commands['fun'].execute(message, args, client, prefix, utils);
                break;

            // ===== JEUX =====
            case 'imposteur_anime':
            case 'defi':
            case 'anagramme':
            case 'morpion':
            case 'bombe':
            case 'repondre':
                await commands['jeux'].execute(message, args, client, prefix, utils);
                break;

            // ===== YOUTUBE & IMAGES =====
            case 'play':
            case 'play2':
            case 'lyrics':
            case 'img':
            case 'gif':
                await commands['youtube'].execute(message, args, client, prefix, config);
                break;

            // ===== PAROLES =====
            case 'parole':
                await commands['paroles'].execute(message, args, client, prefix, config);
                break;

            // ===== GROUPE =====
            case 'antilink':
            case 'antimention':
            case 'antiview':
            case 'antivueunique':
            case 'antitransfert':
            case 'antipromote':
            case 'antidemote':
            case 'antiaudio':
            case 'antiimage':
            case 'antivideo':
            case 'antispam':
            case 'antibot':
            case 'antical':
            case 'antipurge':
            case 'welcome':
            case 'leave':
            case 'mute':
            case 'unmute':
            case 'kick':
            case 'kickall':
            case 'add':
            case 'promote':
            case 'demote':
            case 'grouplink':
            case 'groupeinfo':
            case 'autoreact':
            case 'autoview':
            case 'statut':
                await commands['groupement'].execute(message, args, client, prefix, utils);
                break;

            // ===== ADMIN =====
            case 'sudo':
            case 'addsudo':
            case 'rmsudo':
                await commands['admin'].execute(message, args, client, prefix, utils);
                break;

            // ===== UTILITAIRES =====
            case 'ping':
            case 'info':
            case 'menu':
            case 'help':
            case 'public':
            case 'private':
            case 'vv':
            case 'prefix':
            case 'contact':
                await commands['utilitaires'].execute(message, args, client, prefix, utils);
                break;

            // ===== SI COMMANDE INCONNUE =====
            default:
                await message.reply(`❓ Commande inconnue. Tape ${prefix}menu`);
        }

    } catch (error) {
        console.error('❌ Erreur:', error);
        await message.reply('❌ Une erreur est survenue.');
    }
});

// Connexion WhatsApp avec code à 8 chiffres
client.on('ready', () => {
    console.log(`✅ ${botName} v${config.version} connecté !`);
    console.log(`📋 ${Object.keys(commands).length} commandes chargées`);
});

// QR Code (fallback si le code ne marche pas)
client.on('qr', qr => {
    console.log('📱 Scanne ce QR code avec WhatsApp :');
    require('qrcode-terminal').generate(qr, { small: true });
});

console.log(`🔄 Démarrage de ${botName}...`);
console.log('📱 Attends le code à 8 chiffres dans le terminal...');

// 🔑 Code à 8 chiffres - REMPLACE PAR TON NUMÉRO
client.requestPairingCode('237651539195');

client.initialize();