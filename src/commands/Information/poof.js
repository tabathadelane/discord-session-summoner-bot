const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poof")
    .setDescription("Summon the summoner!"),
  async execute(interaction) {
    console.log("/poof command entered");
    const url =
      "https://discord.com/api/guilds/690636760698323065/scheduled-events";
    // cron.schedule("*/10 * * * * *", async () => {
    const events = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
      },
    }).then((response) => response.json());

    var upcomingEvent = events[0];
    var location;

    var upcomingDate = new Date(events[0].scheduled_start_time);
    const now = new Date();

    for (each of events) {
      var tempDate = new Date(each.scheduled_start_time);

      // check that the event hasn't started
      if (now.getTime() < tempDate.getTime()) {
        // time math to find the closest one
        if (tempDate.getTime() < upcomingDate.getTime()) {
          upcomingDate = tempDate;
          upcomingEvent = each;
          location = each.entity_metadata.location;
        }
      }
    }
    console.log(upcomingEvent);

    const month = upcomingDate.toLocaleString("en-US", {
      month: "long",
    });
    const day = upcomingDate.toLocaleString("en-US", {
      day: "numeric",
    });
    const weekday = upcomingDate.toLocaleString("en-US", {
      weekday: "long",
    });
    const time = upcomingDate.toLocaleString("en-US", {
      timeStyle: "short",
    });

    const formatDate = `${weekday}, ${month} ${day} at ${time}.`;

    // cron.schedule("*/10 * * * * *", async () => {
    // const getChannel = await fetch(
    //   "https://discord.com/api//channels/690636761243844662",
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization:
    //         `Bot ${process.env.TOKEN}`,
    //     },
    //   }
    // ).then((response) => response.json());
    // var formatLocation = "";

    await console.log(location);
    // await console.log(getChannel.name);
    const exampleEmbed = new MessageEmbed()
      .setTitle("Divination determines...")
      .addFields(
        {
          name: `The next session is ${location ?? ` at ${location}` | "..."}`,
          value: formatDate,
        },
        {
          name: upcomingEvent.name,
          value: upcomingEvent.description,
        }
      );
    // .addField(`This events takes place ${formatLocation}`, "\u200b", true);
    // await client.channels.cache
    //   .get("927723006795583569")
    //   .send({ embeds: [exampleEmbed] });

    // await interaction.reply(`The next session is ${formatDate}`);
    await interaction.reply({ embeds: [exampleEmbed] });
  },
};
