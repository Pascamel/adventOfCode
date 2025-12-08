import { IDay } from "./helpers";
import { day03input } from "./data";

export class Day03 implements IDay {
  buildArray(commands: string[]): [number, number][] {
    const result: [number, number][] = [[0, 0]];
    let x = 0,
      y = 0;

    for (const command of commands) {
      const direction = command[0];
      let count = parseInt(command.slice(1), 10);

      while (count > 0) {
        if (direction === "U") y += 1;
        if (direction === "D") y -= 1;
        if (direction === "R") x += 1;
        if (direction === "L") x -= 1;

        result.push([x, y]);
        count -= 1;
      }
    }

    return result;
  }

  solve(input: string) {
    const listInput = input.trim().split("\n");

    const points1 = this.buildArray(listInput[0].split(","));
    const points2 = this.buildArray(listInput[1].split(","));

    // Convert to sets of string keys for fast intersection
    const set1 = new Set(points1.map((p) => `${p[0]},${p[1]}`));
    const set2 = new Set(points2.map((p) => `${p[0]},${p[1]}`));

    const intersect: [number, number][] = [];

    for (const key of set1) {
      if (set2.has(key) && key !== "0,0") {
        const [x, y] = key.split(",").map(Number);
        intersect.push([x, y]);
      }
    }

    // -----------------------------------
    // Part 1: Manhattan distance
    // -----------------------------------
    const distances = intersect
      .map(([x, y]) => Math.abs(x) + Math.abs(y))
      .sort((a, b) => a - b);

    const part1 = distances[0];

    // -----------------------------------
    // Part 2: step counts (index lookup)
    // -----------------------------------
    const steps = intersect
      .map(
        ([x, y]) =>
          points1.findIndex((p) => p[0] === x && p[1] === y) +
          points2.findIndex((p) => p[0] === x && p[1] === y)
      )
      .sort((a, b) => a - b);

    const part2 = steps[0];

    return [part1, part2];
  }

  run() {
    const [p1, p2] = this.solve(day03input);

    console.log("day 03 step 1: " + p1.toString());
    console.log("day 03 step 2: " + p2.toString());
  }
}
