require("dotenv").config();

const startConnection = require("./lib/connection");

startConnection().catch(err => {
    console.error("Erreur de démarrage :", err);
});