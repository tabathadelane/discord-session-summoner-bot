const cron = require("node-cron");
const fetch = require("node-fetch");
const { getUpcomingEventData } = require("../hooks/getUpcomingEvent.js");
const { MessageAttactchment, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const e = getUpcomingEventData();
    console.log(e);
    const task = cron.schedule("*/10 * * * * *", async () => {
      const exampleEmbed = new MessageEmbed()
        .setTitle("Detect upcoming event test")
        .addFields({
          name: "Next session is in ONE HOUR",
          value: e.eventDate,
        })
        .setImage("https://c.tenor.com/EQkSXM9MkigAAAAC/judge-judy-hurry.gif");

      if (
        e.upcomingDate.getTime() - e.now.getTime() < 3600000 &&
        e.upcomingDate.getTime() - e.now.getTime() > 3540000
      ) {
        client.channels.cache
          .get("927723006795583569")
          .send({ embeds: [exampleEmbed] });
      }
      // const events = client.guildScheduledEventUserAdd;

      // ++++++++ cron interval - working +++++++++++++
      // const task = cron.schedule("*/10 * * * * *", () => {
      //   console.log("Cron");
      //   console.log(events);
      // +++++++ send message to test channel ++++++++
      // client.channels.cache
      //   .get("927723006795583569")
      //   .send("test every 10seconds");
      // +++++++++Nthis works!! ++++++++++
      // client.channels.cache.get("927723006795583569").send("send messsage");

      // there is currently no way to return a list of events that I can find. maybe just set it up to run once a week and post a reminder with a custom message?
      // https://discord.js.org/#/docs/main/stable/typedef/FetchGuildScheduledEventOptions
      //   https://discordjs.guide/#before-you-begin
      //  good channel: https://www.youtube.com/watch?v=IOanHyiUtzo&list=PLv0io0WjFNn_4ryS0QmYbph3GWdHvXLeu&index=3
    });
    task.start();
  },
};
