import { day03input } from "./data";
import { IDay } from "./helpers";

export class Day03 implements IDay {
  countTrees(lines: boolean[][], right: number, down: number): number {
    let count = 0;
    let row = 0;
    let col = 0;

    const height = lines.length;
    const width = lines[0].length;

    while (row < height) {
      if (lines[row][col]) count++;
      row += down;
      col = (col + right) % width;
    }

    return count;
  }

  part1(lines: boolean[][]): number {
    return this.countTrees(lines, 3, 1);
  }

  part2(lines: boolean[][]): number {
    return (
      this.countTrees(lines, 1, 1) *
      this.countTrees(lines, 3, 1) *
      this.countTrees(lines, 5, 1) *
      this.countTrees(lines, 7, 1) *
      this.countTrees(lines, 1, 2)
    );
  }

  solve(input: string) {
    const lines = input.split(/\r?\n/).map((line) =>
      line
        .trim()
        .split("")
        .map((char) => char === "#")
    );

    const step1 = this.part1(lines);
    const step2 = this.part2(lines);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day03input);

    console.log(`day 03 step 1: ${step1}`);
    console.log(`day 03 step 2: ${step2}`);
  }
}

// Example usage:
// console.log(Day3.solve("sample.txt", "input.txt"));
