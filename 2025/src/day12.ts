import { day12sample } from "./data";
import { IDay } from "./helpers";

export class Day12 implements IDay<number[]> {
  solve(input: string) {
    const data = input
      .split("\n\n")
      .slice(-1)[0]
      .split("\n")
      .map((line) => {
        const [width, height] = line.split(": ")[0].split("x").map(Number);
        const total = line
          .split(": ")[1]
          .split(" ")
          .map(Number)
          .reduce((a, b) => a + b, 0);

        return { width, height, total };
      });

    // nice troll :)
    const step1 = data.filter(
      (grid) => grid.total <= Math.floor(grid.width / 3) * Math.floor(grid.height / 3)
    ).length;

    return [step1, 0];
  }

  run() {
    const [step1, step2] = this.solve(day12sample);

    console.log(`day 12 step 1: ${step1}`);
    console.log(`day 12 step 2: ${step2}`);
  }
}
