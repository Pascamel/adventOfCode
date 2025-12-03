import { day03input } from "./data";
import { IDay, Sum } from "./helpers";

function findHighestDigits(line: number[], left: number): number[] {
  const lineWithoutLastNumbers = left === 1 ? line : line.slice(0, 1 - left);
  const highestIndex = lineWithoutLastNumbers.indexOf(Math.max(...lineWithoutLastNumbers));

  if (left === 1) {
    return [lineWithoutLastNumbers[highestIndex]];
  }

  return [line[highestIndex], ...findHighestDigits(line.slice(highestIndex + 1), left - 1)];
}

function digitsToNumber(digits: number[]) {
  return digits.reduce((sum, digit, i) => sum + digit * 10 ** (digits.length - 1 - i), 0);
}

export class Day03 implements IDay<number[]> {
  solve(input: string) {
    const lines = input.split("\n").map((line) => line.split("").map(Number));

    const part1 = Sum(lines.map((line) => digitsToNumber(findHighestDigits(line, 2))));
    const part2 = Sum(lines.map((line) => digitsToNumber(findHighestDigits(line, 12))));

    return [part1, part2];
  }

  run() {
    const [step1, step2] = this.solve(day03input);

    console.log(`day 03 step 1: ${step1}`);
    console.log(`day 03 step 2: ${step2}`);
  }
}
