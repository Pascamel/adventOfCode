import { IDay } from "./helpers";
import { day06input, day06sample } from "./data";

export class Day06 implements IDay {
  private step1(lines: string[][]): number {
    // const orbits = new Map<string, number>([["COM", 0]]);

    // lines.sort((a, b) => (a[0] === "COM" ? -1 : a[1] === b[0] ? -1 : 1));

    console.log(lines);

    const test = lines.reduce(
      (acc, line) => {
        if (line[0] === "COM") {
          acc.push(line[1]);
        }
        return acc;
      },
      {
        orbits: [["COM"]],
        left: lines,
      }
    );

    console.log(orbits);
    console.log(Array.from(orbits.values()));

    return Array.from(orbits.values()).reduce((acc, value) => acc + value, 0);
  }

  private step2(lines: string[][]): number {
    return 456;
  }

  solve(input: string) {
    const lines = input.split("\n").map((line) => line.split(")"));

    const step1 = this.step1(lines);
    const step2 = this.step2(lines);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day06input);

    console.log(`Day 06 step 1: ${step1}`);
    console.log(`Day 06 step 2: ${step2}`);
  }
}
