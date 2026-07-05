const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const config = require('./config/config.js');
const qr = require('qrcode-terminal');

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

const commands = {};
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands[command.name] = command;
    console.log(`✅ Commande chargée : ${command.name}`);
}

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

        if (commands[commandName]) {
            await commands[commandName].execute(message, args, client, prefix, utils);
            return;
        }

        const specialCommands = ['imposteur', 'defi', 'anagramme', 'morpion', 'bombe', 'repondre', 'love', 'compatibilite', 'aura', 'cap', 'actionverite', 'quiz', 'histoire'];
        if (specialCommands.includes(commandName)) {
            await commands['jeux'].execute(message, args, client, prefix, utils);
            return;
        }

        if (['yt', 'youtube', 'video', 'photo', 'play'].includes(commandName)) {
            await commands['youtube'].execute(message, args, client, prefix, config);
            return;
        }

        if (['parole', 'lyrics'].includes(commandName)) {
            await commands['paroles'].execute(message, args, client, prefix, config);
            return;
        }

        if (['blague', 'citation', 'devinette', 'charade', 'poeme', 'priere'].includes(commandName)) {
            await commands['divertissement'].execute(message, args, client, prefix, utils);
            return;
        }

        if (['antilink', 'antimention', 'antiview', 'antivueunique', 'antitransfert', 'antipromote', 'antidemote', 'welcome', 'leave', 'mute', 'unmute', 'kick', 'kickall', 'add', 'promote', 'demote', 'grouplink', 'groupeinfo', 'autoreact', 'autoview', 'statut'].includes(commandName)) {
            await commands['groupement'].execute(message, args, client, prefix, utils);
            return;
        }

        if (['sudo', 'addsudo', 'rmsudo'].includes(commandName)) {
            await commands['admin'].execute(message, args, client, prefix, utils);
            return;
        }

        if (['ping', 'info', 'menu', 'help'].includes(commandName)) {
            await commands['utilitaires'].execute(message, args, client, prefix, utils);
            return;
        }

        await message.reply(`❓ Commande inconnue. Tape .menu`);

    } catch (error) {
        console.error('❌ Erreur:', error);
        await message.reply('❌ Une erreur est survenue.');
    }
});

client.on('ready', () => {
    console.log(`✅ ${botName} v${config.version} connecté !`);
    console.log(`📋 ${Object.keys(commands).length} commandes chargées`);
});

// 🔑 CODE À 8 CHIFFRES - Connexion avec numéro
client.requestPairingCode('237651539195');

console.log(`🔄 Démarrage de ${botName}...`);
console.log('📱 Attends le code à 8 chiffres dans le terminal...');

client.initialize();