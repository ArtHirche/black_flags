import { Client, Collection, REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { Command, Event } from "../types";

declare module "discord.js" {
    interface Client {
        commands: Collection<string, Command>;
    }
}

export async function loadCommands(client: Client) {
    client.commands = new Collection();
    const commandsPath = path.join(__dirname, "../commands");

    if (!fs.existsSync(commandsPath)) return;

    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const commandModule = await import(pathToFileURL(filePath).href);
        const command = commandModule.default;

        if (command && command.data && command.execute) {
            client.commands.set(command.data.name, command);
            console.log(`[CMD] Loaded ${command.data.name}`);
        } else {
            console.warn(`[CMD] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

export async function registerCommands(client: Client) {
    const commands = [];
    const commandsPath = path.join(__dirname, "../commands");

    if (!fs.existsSync(commandsPath)) return;

    const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const commandModule = await import(pathToFileURL(filePath).href);
        const command = commandModule.default;
        if (command && command.data) {
            commands.push(command.data.toJSON());
        }
    }

    const rest = new REST().setToken(process.env.DISCORD_TOKEN!);

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID!),
            { body: commands },
        );

        console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
}

export async function loadEvents(client: Client) {
    const eventsPath = path.join(__dirname, "../events");

    if (!fs.existsSync(eventsPath)) return;

    const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".ts") || file.endsWith(".js"));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const eventModule = await import(pathToFileURL(filePath).href);
        const event: Event<any> = eventModule.default;

        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
        console.log(`[EVENT] Loaded ${event.name}`);
    }
}
