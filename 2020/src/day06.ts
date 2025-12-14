import { day06sample } from "./data";
import { IDay } from "./helpers";

export class Day06 implements IDay {
  solve(input: string) {
    const data = input.split("\n\n").map((lines) => lines.split("\n"));

    const step1 = data.reduce(
      (acc, line) => acc + new Set(line.join("")).size,
      0
    );

    const step2 = data.reduce((acc, lines) => {
      const map: Map<string, number> = new Map();

      lines.forEach((line) => {
        line.split("").forEach((char) => {
          map.set(char, (map.get(char) ?? 0) + 1);
        });
      });

      const count = Array.from(map.values()).filter(
        (value) => value === lines.length
      ).length;

      return acc + count;
    }, 0);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day06sample);

    console.log(`day 06 step 1: ${step1}`);
    console.log(`day 06 step 2: ${step2}`);
  }
}
