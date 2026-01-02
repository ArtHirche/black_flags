export class RNG {

    static range(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static chance(percentage: number): boolean {
        return this.range(1, 100) <= percentage;
    }

    static pick<T>(array: T[]): T {
        return array[this.range(0, array.length - 1)];
    }

    static variance(value: number, percentage: number): number {
        const variance = Math.floor(value * (percentage / 100));
        return this.range(value - variance, value + variance);
    }
}
