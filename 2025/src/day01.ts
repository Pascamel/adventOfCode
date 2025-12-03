import { day01input } from "./data";
import { IDay } from "./helpers";

export class Day01 implements IDay<number[]> {
  solve(input: string) {
    const lines = input
      .split("\n")
      .map((line) => (line.startsWith("L") ? -1 : 1) * parseInt(line.slice(1)));

    const { part1, part2 } = lines.reduce(
      ({ position, part1, part2 }, rotation) => {
        const newPosition = (position + rotation + 100) % 100;
        return {
          position: newPosition,
          part1: part1 + (newPosition === 0 ? 1 : 0),
          part2:
            part2 +
            (rotation > 0
              ? Math.floor((position + rotation) / 100) - Math.floor(position / 100)
              : Math.floor((position - 1) / 100) - Math.floor((position - 1 + rotation) / 100)),
        };
      },
      { position: 50, part1: 0, part2: 0 }
    );

    return [part1, part2];
  }

  run() {
    const [step1, step2] = this.solve(day01input);

    console.log(`day 01 step 1: ${step1}`);
    console.log(`day 01 step 2: ${step2}`);
  }
}
