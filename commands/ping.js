const { SlashCommandBuilder } = require("@discordjs/builders");
const ResultEmbed = require("../helpers/commandResult");

module.exports = {
  name: "Ping",
  emoji: ":ping_pong:",
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
  async execute(interaction) {
    interaction.reply({ content: "Pinging..." });
    interaction.deleteReply();
    const message = [
      `My latency is \`${Math.abs(
        Date.now() - interaction.createdTimestamp
      )}\`ms.`,
    ];
    ResultEmbed.simple(
      interaction.client,
      interaction.channel.id,
      this.name,
      this.emoji,
      null,
      message
    );
  },
};
