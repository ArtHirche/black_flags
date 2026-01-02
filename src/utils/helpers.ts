import { IBattleFighter } from "../engine/Battle";
import { User } from "discord.js";

export async function getBattlePlayer(user: User): Promise<IBattleFighter> {
    return {
        id: user.id,
        name: user.username,
        avatarUrl: user.displayAvatarURL({ extension: "png" }),
        hp: 100,
        maxHp: 100,
        atk: 10,
        def: 5,
        isBot: user.bot,
    };
}
