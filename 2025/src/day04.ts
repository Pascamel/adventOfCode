import { day04input, day04sample } from "./data";
import { IDay } from "./helpers";

export class Day04 implements IDay<number[]> {
  countNeighbors(lines: string[][], i: number, j: number) {
    return (
      (lines[i - 1] && lines[i - 1][j - 1] === "@" ? 1 : 0) +
      (lines[i - 1] && lines[i - 1][j] === "@" ? 1 : 0) +
      (lines[i - 1] && lines[i - 1][j + 1] === "@" ? 1 : 0) +
      (lines[i] && lines[i][j - 1] === "@" ? 1 : 0) +
      (lines[i] && lines[i][j + 1] === "@" ? 1 : 0) +
      (lines[i + 1] && lines[i + 1][j - 1] === "@" ? 1 : 0) +
      (lines[i + 1] && lines[i + 1][j] === "@" ? 1 : 0) +
      (lines[i + 1] && lines[i + 1][j + 1] === "@" ? 1 : 0)
    );
  }

  solve(input: string) {
    const lines = input.split("\n").map((line) => line.split(""));

    let part1 = 0;

    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === "@") {
          if (this.countNeighbors(lines, i, j) < 4) {
            part1++;
          }
        }
      }
    }

    let part2 = 0;
    let keepIterating = true;
    let toRemove = [];

    while (keepIterating) {
      keepIterating = false;

      for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
          if (lines[i][j] === "@") {
            if (this.countNeighbors(lines, i, j) < 4) {
              toRemove.push([i, j]);
              keepIterating = true;
            }
          }
        }
      }

      part2 += toRemove.length;
      for (const [i, j] of toRemove) {
        lines[i][j] = ".";
      }

      toRemove = [];
    }

    return [part1, part2];
  }

  run() {
    const [step1, step2] = this.solve(day04input);

    console.log(`day 04 step 1: ${step1}`);
    console.log(`day 04 step 2: ${step2}`);
  }
}
