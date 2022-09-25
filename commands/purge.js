const { SlashCommandBuilder, messageLink } = require("@discordjs/builders");
const { Interaction } = require("discord.js");
const { PermissionFlagsBits } = require("discord-api-types/v9");
const ResultEmbed = require("../helpers/commandResult");

module.exports = {
  name: "Purge",
  emoji: ":put_litter_in_its_place:",
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
      var deletedMessages;
      await interaction.channel
        .bulkDelete(interaction.options.getInteger("amount"))
        .then((messages) => (deletedMessages = messages));
      await interaction.reply({ content: "Purging..." });
      await interaction.deleteReply();
      const message = [
        `Channel: <#${interaction.channel.id}>`,
        `Messages requested: \`${interaction.options.getInteger("amount")}\``,
        `Messages deleted: \`${deletedMessages.size}\``,
      ];
      const logMessage = [
        `Messages requested: \`${interaction.options.getInteger("amount")}\``,
        `Messages deleted: \`${deletedMessages.size}\``,
      ];
      ResultEmbed.simple(
        interaction.client,
        interaction.channel.id,
        this.name,
        this.emoji,
        null,
        message
      );
      ResultEmbed.log(
        interaction.client,
        this.name,
        this.emoji,
        interaction.user,
        interaction.channel,
        interaction.guild,
        logMessage,
        true
      );
    } catch (err) {
      await interaction.reply({ content: "An error occured" });
      await interaction.deleteReply();
      const message = [
        `Message deletion failed.`,
        `Maybe the messages are older than 14 days?`,
      ];
      ResultEmbed.simple(
        interaction.client,
        interaction.channel.id,
        this.name,
        this.emoji,
        "Could not delete messages",
        message
      );
      ResultEmbed.log(
        interaction.client,
        this.name,
        this.emoji,
        interaction.user,
        interaction.channel,
        interaction.guild,
        message,
        false
      );
      ResultEmbed.error(interaction.client, this.name, err);
    }
  },
};
