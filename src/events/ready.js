const cron = require("node-cron");
const fetch = require("node-fetch");
const { MessageAttactchment, MessageEmbed } = require("discord.js");

require("dotenv").config();

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
    const url =
      "https://discord.com/api/guilds/690636760698323065/scheduled-events";
    const task = cron.schedule("* * * * *", async () => {
      const events = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bot ${process.env.TOKEN}`,
        },
      }).then((response) => response.json());

      var upcomingEvent = events[0];
      var entityType = upcomingEvent.entity_type;
      var location = upcomingEvent.entity_metadata.location;

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
            entityType = each.entity_type;
            location = each.entity_metadata.location;
          }
        }
      }

      //
      console.log(entityType, location);

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

      const eventDate = `${weekday}, ${month} ${day} at ${time}.`;
      console.log(now);

      const twoHourEmbedVoice = new MessageEmbed()
        .setTitle("You see rip in space and time...")
        .addFields(
          {
            name: "Your next session is approaching.",
            value: eventDate,
          },
          {
            name: upcomingEvent.name,
            value: upcomingEvent.description,
          }
        )
        .setImage("https://kirbyrunner.netlify.app/pink-portal.d5c9c189.gif");

      const twoHourEmbed = new MessageEmbed()
        .setTitle("Pack your dice & provisions!")
        .addFields(
          {
            name: `Your session at ${location} is approaching.`,
            value: eventDate,
          },
          {
            name: upcomingEvent.name,
            value: upcomingEvent.description,
          }
        )
        .setImage("https://i.imgur.com/fdeMC.gif");

      const fifteenMinuteEmbed = new MessageEmbed()
        .setTitle("Are you prepared?")
        .addFields(
          {
            name: "We will be waiting...",
            value: eventDate,
          },
          {
            name: upcomingEvent.name,
            value: upcomingEvent.description,
          }
        )
        .setImage("https://c.tenor.com/EQkSXM9MkigAAAAC/judge-judy-hurry.gif");

      const timeMath = upcomingDate.getTime() - now.getTime();
      console.log(timeMath);
      if (timeMath < 7230000 && timeMath > 7170000) {
        if (entityType === 3) {
          await client.channels.cache
            .get("927723006795583569")
            .send({ embeds: [twoHourEmbed] });
          console.log("Posted in-person event");
        } else {
          await client.channels.cache
            .get("690637774436433982")
            .send({ embeds: [twoHourEmbedVoice] });
          console.log(location, " - Posted voice event");
        }
      }
      if (timeMath < 930000 && timeMath > 870000) {
        await client.channels.cache
          .get("690637774436433982")
          .send({ embeds: [fifteenMinuteEmbed] });
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
