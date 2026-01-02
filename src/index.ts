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

// Register commands on ready (or use a separate script, here doing it in ready event is safer or manually)
client.once("ready", async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    // Uncomment to register/update commands on startup (careful with rate limits)
    await registerCommands(client);
});
