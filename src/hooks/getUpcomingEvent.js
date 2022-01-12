const { ContextMenuCommandBuilder } = require("@discordjs/builders");
const fetch = require("node-fetch");

async function fetchEvents() {
  const url =
    "https://discord.com/api/guilds/690636760698323065/scheduled-events";

  const events = await fetch(url, {
    method: "GET",
    headers: {
      Authorization:
        "Bot OTI3NzE1NTExOTA5ODc5ODI5.YdOQZg.4kHvG7Qc_bVkTjl5jUUACLZqyys",
    },
  }).then((response) => response.json());
  // const eventData = await getUpcomingEventData(json);
  // console.log(json);
  return events;
}

async function getUpcomingEventData() {
  const events = await fetchEvents();
  var eventData = {
    upcomingEvent: {},
    upcomingDate: "",
    formatDate: "",
  };
  console.log("events", eventData);
  var upcomingEvent = "";

  const checkDate = new Date(events[0].scheduled_start_time);
  const now = new Date();

  for (each of events) {
    var tempDate = new Date(each.scheduled_start_time);

    // check that the event hasn't started
    if (now.getTime() < tempDate.getTime()) {
      // time math to find the closest one
      if (tempDate.getTime() < checkDate.getTime()) {
        eventData.upcomingDate = tempDate;
        checkDate = each;
        eventData.upcomingEvent = upcomingEvent;
      }
    }
  }

  //

  const month = eventData.upcomingDate.toLocaleString("en-US", {
    month: "long",
  });
  const day = eventData.upcomingDate.toLocaleString("en-US", {
    day: "numeric",
  });
  const weekday = eventData.upcomingDate.toLocaleString("en-US", {
    weekday: "long",
  });
  const time = eventData.upcomingDate.toLocaleString("en-US", {
    timeStyle: "short",
  });

  eventData.formatDate = `${weekday}, ${month} ${day} at ${time}.`;

  return eventData;
}

// const eventData = getUpcomingEventData();
// console.log("eventData", eventData);
module.exports = { getUpcomingEventData };

// const events = await fetch(url, {
//   method: "GET",
//   headers: {
//     Authorization:
//       "Bot OTI3NzE1NTExOTA5ODc5ODI5.YdOQZg.4kHvG7Qc_bVkTjl5jUUACLZqyys",
//   },
// }).then((response) => response.json());

// var upcomingEvent = "";

// var upcomingDate = new Date(events[0].scheduled_start_time);
// const now = new Date();

// for (each of events) {
//   var tempDate = new Date(each.scheduled_start_time);

//   // check that the event hasn't started
//   if (now.getTime() < tempDate.getTime()) {
//     // time math to find the closest one
//     if (tempDate.getTime() < upcomingDate.getTime()) {
//       upcomingDate = tempDate;
//       upcomingEvent = each;
//     }
//   }
// }

// //

// const month = upcomingDate.toLocaleString("en-US", {
//   month: "long",
// });
// const day = upcomingDate.toLocaleString("en-US", {
//   day: "numeric",
// });
// const weekday = upcomingDate.toLocaleString("en-US", {
//   weekday: "long",
// });
// const time = upcomingDate.toLocaleString("en-US", {
//   timeStyle: "short",
// });

// const eventDate = `${weekday}, ${month} ${day} at ${time}.`;
