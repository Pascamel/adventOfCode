import { day07input, day07sample } from "./data";
import { IDay } from "./helpers";

export class Day07 implements IDay<number[]> {
  solve(input: string) {
    const lines = input.split("\n").reduce<{ start: number; lines: number[][] }>(
      (acc, line) => {
        if (line.indexOf("S") > -1) {
          acc.start = line.indexOf("S");
        }
        if (line.indexOf("^") > -1) {
          acc.lines.push(
            line
              .split("")
              .map((char, i) => (char === "^" ? i : -1))
              .filter((i) => i > -1)
          );
        }
        return acc;
      },
      { start: 0, lines: [] }
    );

    const memo1: string[] = [];
    const memo2 = new Map<string, number>();

    function helper(start: { row: number; col: number }, lines: number[][]): number {
      if (memo2.has(`${start.row}-${start.col}`)) {
        return memo2.get(`${start.row}-${start.col}`)!;
      }

      if (!lines[start.row + 1]) {
        return 1;
      }

      if (
        lines[start.row + 1].includes(start.col) &&
        !memo1.includes(`${start.row + 1}-${start.col}`)
      ) {
        memo1.push(`${start.row + 1}-${start.col}`);
      }

      const result = lines[start.row + 1].includes(start.col)
        ? helper({ row: start.row + 1, col: start.col - 1 }, lines) +
          helper({ row: start.row + 1, col: start.col + 1 }, lines)
        : helper({ row: start.row + 1, col: start.col }, lines);

      memo2.set(`${start.row}-${start.col}`, result);

      return result;
    }

    const step2 = helper({ row: -1, col: lines.start }, lines.lines);
    const step1 = memo1.length;

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day07input);

    console.log(`day 07 step 1: ${step1}`);
    console.log(`day 07 step 2: ${step2}`);
  }
}
