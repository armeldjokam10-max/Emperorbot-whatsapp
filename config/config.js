module.exports = {
  prefix: process.env.PREFIX || "!",
  botName: process.env.BOT_NAME || "EmperorBot",

  owner: {
    name: process.env.OWNER_NAME || "Armel Djokam",
    number: process.env.OWNER_NUMBER || ""
  },

  pairingNumber: process.env.PAIRING_NUMBER || "",

  api: {
    openai: process.env.OPENAI_API_KEY || "",
    gemini: process.env.GEMINI_API_KEY || "",
    youtube: process.env.YOUTUBE_API_KEY || "",
    genius: process.env.GENIUS_API_KEY || "",
    weather: process.env.WEATHER_API_KEY || "",
    removebg: process.env.REMOVE_BG_API_KEY || ""
  }
};