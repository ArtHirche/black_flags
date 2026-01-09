import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Command } from "../types";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("ajuda")
        .setDescription("Lista todos os comandos disponíveis no bot"),
    async execute(interaction) {
        try {
            const commands = interaction.client.commands;

            const embed = new EmbedBuilder()
                .setTitle("Comandos Disponíveis")
                .setColor("#0099ff")
                .setDescription("Aqui estão os comandos que você pode usar:")
                .setTimestamp();

            commands.forEach((cmd) => {
                // Check if cmd.data exists and has name/description
                // Depending on how SlashCommandBuilder is structured, name and description might be directly accessible or via toJSON()
                // The registered commands in client.commands are likely the Command objects
                const name = cmd.data.name;
                const description = cmd.data.description;

                if (name && description) {
                    embed.addFields({ name: `/${name}`, value: description });
                }
            });

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error("[Help Command Error]", error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: "Ocorreu um erro ao executar este comando.", ephemeral: true });
            } else {
                await interaction.reply({ content: "Ocorreu um erro ao executar este comando.", ephemeral: true });
            }
        }
    },
};

export default command;
