import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../types";
import { getBattlePlayer } from "../../utils/helpers";
import { Battle } from "../../engine/Battle";

const command: Command = {
    data: new SlashCommandBuilder()
        .setName("batalhar")
        .setDescription("Desafie outro usuário para um duelo!")
        .addUserOption((option) =>
            option
                .setName("oponente")
                .setDescription("O usuário que você quer desafiar")
                .setRequired(true)
        ),
    async execute(interaction) {
        const opponentUser = interaction.options.getUser("oponente");

        if (!opponentUser) {
            await interaction.reply({ content: "Oponente inválido.", ephemeral: true });
            return;
        }

        if (opponentUser.id === interaction.user.id) {
            await interaction.reply({ content: "Você não pode batalhar contra si mesmo!", ephemeral: true });
            return;
        }

        await interaction.deferReply();

        const p1 = await getBattlePlayer(interaction.user);
        const p2 = await getBattlePlayer(opponentUser);

        const battle = new Battle(p1, p2);
        const logs = battle.simulate();
        const winner = battle.winner;

        // Simple text based output for now
        // TODO: Use Canvas to render the battle
        const logText = logs.map(l => `[T${l.turn}] ${l.message}`).join("\n");
        const resultText = winner
            ? `\n🏆 **Vencedor:** ${winner.name} com ${winner.hp} HP restantes!`
            : "\nEmpate (Limite de turnos atingido)!";

        // Discord message limit is 2000 chars, truncate if needed
        const finalMessage = `⚔️ **Batalha: ${p1.name} vs ${p2.name}**\n\n${logText}\n${resultText}`;

        if (finalMessage.length > 2000) {
            await interaction.editReply({
                content: `A batalha foi longa demais para exibir aqui!\n🏆 **Vencedor:** ${winner?.name || "Ninguém"}`
            });
        } else {
            await interaction.editReply({ content: finalMessage });
        }
    },
};

export default command;
