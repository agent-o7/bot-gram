const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
require('dotenv').config();

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain' });
  res.end('hi there i am Scofield');
});

const token =  process.env.SCRT;
// console.log(token)
const bot = new TelegramBot(token, { polling: true });

const validCommands = ["/start", "/help", "/wtf", '/contact'];


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

bot.onText(/\/contact/, (msg) => {
    bot.sendMessage(msg.chat.id,
    "Hello! Je suis l'agent de pachome.\n"+
    "Un chatbot mis en place pour \n"+
    " contacté franklin st scofield ici https://wa.me/22879689386");
});


bot.onText(/\/help/, (msg) => {
    bot.sendMessage(
        msg.chat.id,
        "les commandes possibles sont:\n" +
        "/start\n"+
        "/wtf\n"+
        "/help\n"+
        "/contact"
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

const port = 8000;
server.listen(port, () =>{
    console.log('serveur initialization');
});
