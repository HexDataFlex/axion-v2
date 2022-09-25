const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const Discord = require("discord.js");
require("dotenv").config();

module.exports = {
  name: "ready",
  once: true,
  execute(client, commands) {
    console.log("Axion is online!");

    const CLIENT_ID = client.user.id;

    const rest = new REST({
      version: "9",
    }).setToken(process.env.TOKEN);

    (async () => {
      try {
        if (process.env.ENV === "production") {
          await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
          });
          console.log("Registered commands globally.");
        } else {
          await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
            {
              body: commands,
            }
          );
          console.log("Registered commands locally.");
        }

        var readyStartupEmbed = null;

        if (process.env.MODE === "startup") {
          readyStartupEmbed = new Discord.MessageEmbed()
            .setColor("#6BE24D")
            .setTitle("<a:on:1022493760053063750> Bot is online!")
            .setDescription(
              `<:command:1022494330373554238> Commands has been registered **${
                process.env.ENV === "production" ? "globally" : "locally"
              }**.`
            )
            .setFooter(
              `${
                process.env.ENV === "production" ? "Production" : "Development"
              } mode`
            )
            .setTimestamp();
        } else if (process.env.MODE === "update") {
          readyStartupEmbed = new Discord.MessageEmbed()
            .setColor("#9837EC")
            .setTitle("<a:on:1022493760053063750> Bot has been updated!")
            .setDescription(
              `<:command:1022494330373554238> Commands has been registered **${
                process.env.ENV === "production" ? "globally" : "locally"
              }**.`
            )
            .setFooter(
              `${
                process.env.ENV === "production" ? "Production" : "Development"
              } mode`
            )
            .setTimestamp();
        } else if (process.env.MODE === "development") {
          readyStartupEmbed = new Discord.MessageEmbed()
            .setColor("#F1924E")
            .setTitle("<a:on:1022493760053063750> Bot has been restarted!")
            .setDescription(
              `<:command:1022494330373554238> Commands has been registered **${
                process.env.ENV === "production" ? "globally" : "locally"
              }**.`
            )
            .setFooter(
              `${
                process.env.ENV === "production" ? "Production" : "Development"
              } mode`
            )
            .setTimestamp();
        } else {
          readyStartupEmbed = new Discord.MessageEmbed()
            .setColor("#00ffff")
            .setTitle(":x: An error occurred!")
            .setDescription(`An unknown error occurred.`)
            .setFooter(
              `${
                process.env.ENV === "production" ? "Production" : "Development"
              } mode`
            )
            .setTimestamp();
        }

        client.channels.cache
          .get("1022148519856975962")
          .send({ embeds: [readyStartupEmbed] });
      } catch (err) {
        if (err) console.log(err);
      }
    })();
  },
};
