import { IDay } from "./helpers";
import { day01input } from "./data";

export class Day01 implements IDay {
  private fuelNeeded(mass: number): number {
    return Math.max(0, Math.floor(mass / 3) - 2);
  }

  private fuelNeededTotal(mass: number): number {
    let total = 0;
    let current = this.fuelNeeded(mass);

    while (current > 0) {
      total += current;
      current = this.fuelNeeded(current);
    }

    return total;
  }

  solve(input: string) {
    const listInts = input
      .trim()
      .split(/\r?\n/)
      .map((x) => parseInt(x, 10));

    const mutated1 = listInts.map((m) => this.fuelNeeded(m));
    const part1 = mutated1.reduce((a, b) => a + b, 0);

    const mutated2 = listInts.map((m) => this.fuelNeededTotal(m));
    const part2 = mutated2.reduce((a, b) => a + b, 0);

    return [part1, part2];
  }

  run() {
    const [part1, part2] = this.solve(day01input);

    console.log("part 1:", part1);
    console.log("part 2:", part2);
  }
}
