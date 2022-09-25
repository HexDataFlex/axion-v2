const Discord = require("discord.js");
module.exports = {
  async simple(client, channel, name, emoji, error = null, message = null) {
    var msg = "";
    for (const string of message) {
      msg += `\n<:space:1022518525224571000><:rigtharrow:1022531322041868288> ${string}`;
    }
    console.log(msg);
    const embed = new Discord.MessageEmbed()
      .setColor(error == null ? "#99ff99" : "#ff5050")
      .setTitle(`${emoji} ${name} Command Result`)
      .setDescription(
        `${
          error == null
            ? "<:success:1022530885733589002> **Success**"
            : `:x: **Error: ${error}**`
        }${msg}`
      );
    return client.channels.cache.get(channel).send({ embeds: [embed] });
  },
  async error(client, name, message) {
    console.log(message);
    const logEmbed = new Discord.MessageEmbed()
      .setColor("#ff5050")
      .setTitle(`:x: ${name} Command Error`)
      .setDescription(`\`\`\`${message}\`\`\``)
      .setTimestamp();
    return client.channels.cache
      .get("1022148519856975962")
      .send({ embeds: [logEmbed] });
  },
  async log(
    client,
    name,
    emoji,
    user,
    channel,
    server,
    message = null,
    success
  ) {
    var msg = "";
    for (const string of message) {
      msg += `\n<:space:1022518525224571000><:rigtharrow:1022531322041868288> ${string}`;
    }
    const logEmbed = new Discord.MessageEmbed()
      .setColor("#ff9999")
      .setTitle(`${emoji} ${name} Command Result Log`)
      .setDescription(
        `<:space:1022518525224571000><:rigtharrow:1022531322041868288> Success: ${
          success ? "<:success:1022530885733589002>" : ":x:"
        }\n<:space:1022518525224571000><:rigtharrow:1022531322041868288> User: <@${
          user.id
        }> (${
          user.id
        })\n<:space:1022518525224571000><:rigtharrow:1022531322041868288> Channel: <#${
          channel.id
        }> (${
          channel.id
        })\n<:space:1022518525224571000><:rigtharrow:1022531322041868288> Server: ${
          server.name
        } (${server.id})${msg}`
      )
      .setTimestamp();
    return client.channels.cache
      .get("1022148519856975962")
      .send({ embeds: [logEmbed] });
  },
};
