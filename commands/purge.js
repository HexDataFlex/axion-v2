const { SlashCommandBuilder, messageLink } = require("@discordjs/builders");
const { Interaction } = require("discord.js");
const { PermissionFlagsBits } = require("discord-api-types/v9");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("Purge an amount of messages.")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("The amount of messages to purge.")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    try {
      await interaction.channel
        .bulkDelete(interaction.options.getInteger("amount"))
        .then((messages) =>
          interaction.reply({
            content: `🚮 **Purge** 🢂 Succesfuly deleted \`${
              messages.size
            }\`/\`${interaction.options.getInteger("amount")}\` messages.`,
            ephemeral: true,
          })
        );
    } catch (err) {
      await interaction.reply({
        content:
          "🚮 **Purge** 🢂 An error occured. Maybe the messages are older than 2 weeks.",
        ephemeral: true,
      });
      console.log(err);
    }
  },
};
