const db = require('../database/reponses.js');

module.exports = {
    name: 'fun',
    execute: async (message, args, client, prefix, utils) => {
        const cmd = args[0].toLowerCase();
        const getRandom = utils.getRandom;

        switch(cmd) {
            // ===== LOVE TEST =====
            case 'love':
            case 'lovetest':
                const love = Math.floor(Math.random() * 100) + 1;
                await message.reply(`💖 *Test d'amour*\n\nVotre compatibilité est de ${love}% !`);
                break;

            // ===== COMPATIBILITÉ =====
            case 'compatibilite':
                const compat = Math.floor(Math.random() * 100) + 1;
                await message.reply(`💕 *Compatibilité*\n\nVotre compatibilité est de ${compat}% !`);
                break;

            // ===== AURA =====
            case 'aura':
                const couleurs = ["Rouge 🔴", "Bleu 🔵", "Vert 🟢", "Jaune 🟡", "Violet 🟣", "Orange 🟠", "Rose 🌸", "Blanc ⚪", "Or ✨", "Argent 💎"];
                await message.reply(`🌈 *Test d'aura*\n\nVotre aura est de couleur ${getRandom(couleurs)} !`);
                break;

            // ===== CAP OU PAS CAP =====
            case 'cap':
            case 'capoupascap':
                const caps = ["Cap ! ✅", "Pas cap ! ❌", "Peut-être... 🤔", "Je tente ! 💪", "Je réfléchis... 🧠"];
                await message.reply(`🤔 *Cap ou pas cap ?*\n\n${getRandom(caps)}`);
                break;

            // ===== ACTION OU VÉRITÉ =====
            case 'actionverite':
                const actions = [
                    "Fais 10 pompes maintenant ! 💪",
                    "Chante une chanson en public ! 🎤",
                    "Fais un compliment à la personne à ta droite ! 😊",
                    "Mange un citron sans faire de grimace ! 🍋",
                    "Parle en chantant pendant 1 minute ! 🎵",
                    "Fais le tour de la pièce en marchant sur les mains ! 🏃",
                    "Imite un animal pendant 30 secondes ! 🐒"
                ];
                const verites = [
                    "Quel est ton plus grand secret ? 🤫",
                    "As-tu déjà menti à quelqu'un que tu aimes ? 😅",
                    "Quelle est la chose la plus embarrassante que tu aies faite ? 😳",
                    "As-tu déjà triché lors d'un examen ? 📝",
                    "Quelle est ta plus grande peur ? 😨",
                    "Qui est la personne que tu admires le plus ? 🌟"
                ];
                const choix = Math.random() < 0.5 ? actions : verites;
                await message.reply(`🎯 *Action ou Vérité*\n\n${getRandom(choix)}`);
                break;

            // ===== ANNIVERSAIRE =====
            case 'anniversaire':
                const name = args.slice(1).join(' ') || "toi";
                await message.reply(`🎂 *Joyeux Anniversaire ${name} !*\n\nQue cette journée soit remplie de joie et de bonheur ! 🎉🎁\n\n🎈 Profite bien de ta journée ! 🎊`);
                break;

            // ===== MENU FUN =====
            default:
                await message.reply(
                    `🎭 *FUN*\n\n` +
                    `${prefix}love - Test d'amour 💖\n` +
                    `${prefix}compatibilite - Test de compatibilité 💕\n` +
                    `${prefix}aura - Test d'aura 🌈\n` +
                    `${prefix}cap - Cap ou pas cap 🤔\n` +
                    `${prefix}actionverite - Action ou Vérité 🎯\n` +
                    `${prefix}anniversaire - Souhaiter anniversaire 🎂`
                );
        }
    }
};