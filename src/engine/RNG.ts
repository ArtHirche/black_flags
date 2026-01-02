export class RNG {
    /**
     * Retorna um inteiro aleatório entre min e max (inclusivos).
     */
    static range(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Retorna true se um evento ocorrer dado uma probabilidade (0-100).
     */
    static chance(percentage: number): boolean {
        return this.range(1, 100) <= percentage;
    }

    /**
     * Escolhe um item de um array aleatoriamente.
     */
    static pick<T>(array: T[]): T {
        return array[this.range(0, array.length - 1)];
    }

    /**
     * Aplica variância a um valor (ex: dano +/- 10%)
     */
    static variance(value: number, percentage: number): number {
        const variance = Math.floor(value * (percentage / 100));
        return this.range(value - variance, value + variance);
    }
}
