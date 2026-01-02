import { RNG } from "./RNG";

export interface IBattleFighter {
    id: string; // User ID
    name: string;
    avatarUrl: string;
    hp: number;
    maxHp: number;
    atk: number;
    def: number;
    isBot?: boolean;
}

export interface IBattleLog {
    turn: number;
    attackerId: string;
    defenderId: string;
    damage: number;
    isCrit: boolean;
    message: string;
    fightersState: {
        [id: string]: { hp: number };
    };
}

export class Battle {
    public fighters: IBattleFighter[];
    public logs: IBattleLog[] = [];
    public turn: number = 0;
    public winner?: IBattleFighter;

    constructor(fighter1: IBattleFighter, fighter2: IBattleFighter) {
        this.fighters = [fighter1, fighter2];
    }

    public nextTurn(): IBattleLog | null {
        if (this.winner) return null;

        this.turn++;
        const attackerIdx = (this.turn - 1) % 2;
        const defenderIdx = attackerIdx === 0 ? 1 : 0;

        const attacker = this.fighters[attackerIdx];
        const defender = this.fighters[defenderIdx];

        // Cálculo básico de dano
        // Dano = (Atk * Variância) - (Def * 0.5)
        // Mínimo de 1 dano

        // Critical hit (10% chance - criar atributo de sorte depois?)
        const isCrit = RNG.chance(10);
        const critMultiplier = isCrit ? 1.5 : 1.0;

        const rawDamage = RNG.variance(attacker.atk, 10) * critMultiplier;
        const mitigation = Math.floor(defender.def * 0.5);
        const finalDamage = Math.max(1, Math.floor(rawDamage - mitigation));

        defender.hp = Math.max(0, defender.hp - finalDamage);

        const log: IBattleLog = {
            turn: this.turn,
            attackerId: attacker.id,
            defenderId: defender.id,
            damage: finalDamage,
            isCrit,
            message: this.generateMessage(attacker, defender, finalDamage, isCrit),
            fightersState: {
                [this.fighters[0].id]: { hp: this.fighters[0].hp },
                [this.fighters[1].id]: { hp: this.fighters[1].hp },
            }
        };

        this.logs.push(log);

        if (defender.hp <= 0) {
            this.winner = attacker;
        }

        return log;
    }

    public simulate(): IBattleLog[] {
        while (!this.winner && this.turn < 100) { // Safety break
            this.nextTurn();
        }
        return this.logs;
    }

    private generateMessage(attacker: IBattleFighter, defender: IBattleFighter, damage: number, isCrit: boolean): string {
        const critText = isCrit ? "**CRÍTICO!** " : "";
        return `${critText}**${attacker.name}** atacou **${defender.name}** causando **${damage}** de dano!`;
    }
}
