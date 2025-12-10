import { IDay } from "./helpers";
import { day01sample } from "./data";

export class Day01 implements IDay {
  part1(numbers: number[]): number {
    const seen = new Set<number>();

    for (const num of numbers) {
      if (seen.has(2020 - num)) {
        return num * (2020 - num);
      }
      seen.add(num);
    }

    return -1;
  }

  part2(numbers: number[]): number {
    const seen = new Set(numbers);

    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        if (seen.has(2020 - numbers[i] - numbers[j])) {
          return numbers[i] * numbers[j] * (2020 - numbers[i] - numbers[j]);
        }
      }
    }

    return -1;
  }

  solve(input: string) {
    const numbers = input.split("\n").map((num) => parseInt(num, 10));

    const step1 = this.part1(numbers);
    const step2 = this.part2(numbers);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day01sample);

    console.log(`Day 01 step 1: ${step1}`);
    console.log(`Day 01 step 2: ${step2}`);
  }
}
