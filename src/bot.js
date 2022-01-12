const { Client, Collection, Intents } = require("discord.js");

const fs = require("fs");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
  ],
});
// "GUILD_MESSAGES",
// "GUILD_SCHEDULED_EVENTS",
// "GUILD_MESSAGE_REACTIONS",
// "GUILD_MESSAGE_TYPING",

// List of intents:
// https://discord.com/developers/docs/topics/gateway#gateway-intents

client.commands = new Collection();

require("dotenv").config();

const functions = fs
  .readdirSync("./src/functions")
  .filter((file) => file.endsWith(".js"));
const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

(async () => {
  client.once("api", () => {
    console.log("more test");
  });
  for (file of functions) {
    require(`./functions/${file}`)(client);
  }
  client.handleEvents(eventFiles, "./src/events");
  client.handleCommands(commandFolders, "./src/commands");
  client.login(process.env.token);
})();
// keep as last line in file
