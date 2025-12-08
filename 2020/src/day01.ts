import { IDay } from "./helpers";
import { day01sample } from "./data";

export class Day01 implements IDay {
  partOne(numbers: number[]): number {
    const seen = new Set<number>();

    for (const num of numbers) {
      const target = 2020 - num;
      if (seen.has(target)) {
        return num * target;
      }
      seen.add(num);
    }

    return -1;
  }

  partTwo(numbers: number[]): number {
    const seen = new Set(numbers);

    for (let i = 0; i < numbers.length; i++) {
      for (let j = 0; j < numbers.length; j++) {
        const a = numbers[i];
        const b = numbers[j];
        const c = 2020 - a - b;

        if (seen.has(c)) {
          return a * b * c;
        }
      }
    }

    return -1;
  }

  solve(input: string) {
    const numbers = input.split("\n").map((num) => parseInt(num, 10));

    const step1 = this.partOne(numbers);
    const step2 = this.partTwo(numbers);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day01sample);

    console.log("day 01 step 1: " + step1.toString());
    console.log("day 01 step 2: " + step2.toString());
  }
}
