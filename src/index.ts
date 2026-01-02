import { Client, GatewayIntentBits } from "discord.js";
import * as dotenv from "dotenv";
import { loadCommands, loadEvents, registerCommands } from "./utils/registry";

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

async function main() {
    await loadCommands(client);
    await loadEvents(client);

    client.login(process.env.DISCORD_TOKEN);
}

main().catch(console.error);

client.once("ready", async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    await registerCommands(client);
});
