const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();


const token =  process.env.SCRT;
// console.log(token)
const bot = new TelegramBot(token, { polling: true });

const validCommands = ["/start", "/help", "/wtf"];


// Set bot commands with descriptions
bot.setMyCommands([
  { command: "start", description: "Démarrer le bot 🚀" },
  { command: "help", description: "Obtenir la liste des commandes disponibles 📝" },
  { command: "wtf", description: "Obtenir les informations sur le Bot." },
]);

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Hello! Je suis Franklin Scofield");
});


bot.onText(/\/wtf/, (msg) => {
    bot.sendMessage(msg.chat.id,
    "Hello! Je suis l'agent de pachome.\n"+
    "Un chatbot mis en place pour \n"+
    "1 --> rendre public les heures libres de franklin st");
});

bot.onText(/\/help/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        "les commandes possibles sont:\n" +
        "/start\n"+
        "/wtf\n"+
        "/help"
    );
});

// Handle invalid commands
bot.on("message", (msg) => {
    const text = msg.text.trim();

    // Check if message starts with '/' and is NOT in valid commands
    if (text.startsWith("/") && !validCommands.includes(text)) {
        bot.sendMessage(
            msg.chat.id,
            "❌ Invalid command! Type /help to see available commands."
        );
    }
});