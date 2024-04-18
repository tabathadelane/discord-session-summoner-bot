const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Summon the summoner"),
  async execute(interaction) {
    await interaction.reply("Summoner has appeared!");
  },
};

// fetch("https://aws.random.cat/meow").then((response) => response.json());

// client.on("interactionCreate", async (interaction) => {
//   // ...
//   if (commandName === "cat") {
//     await interaction.deferReply();
//     const { file } = await fetch("https://aws.random.cat/meow").then(
//       (response) => response.json()
//     );
//     interaction.editReply({ files: [file] });
//   }
// });
