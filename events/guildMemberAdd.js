const Discord = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  once: false,
  async execute(member) {
    const newMemberEmbed = new Discord.MessageEmbed()
      .setColor("#39e391")
      .setTitle("New Member!")
      .setDescription(
        `${member.user} joined the server! We hope you will enjoy your stay!`
      )
      .setImage(member.user.avatarURL())
      .setTimestamp();

    member.guild.channels.cache.get("917712964960788541").send({
      embeds: [newMemberEmbed],
    });
  },
};
