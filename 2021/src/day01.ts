import { IDay } from "./helpers";
import { day01input } from "./data";

export class Day01 implements IDay {
  solve(input: string) {
    const nums = input.split("\n").map((num) => parseInt(num, 10));

    let last: number | null = null;
    let lasts: number[] = [];
    let result1 = 0;
    let result2 = 0;

    for (const num of nums) {
      if (last !== null && num > last) {
        result1++;
      }

      last = num;

      lasts = [...lasts, num];
      if (lasts.length > 3) {
        if (lasts[lasts.length - 4] < lasts[lasts.length - 1]) {
          result2++;
        }
      }
    }

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve(day01input);

    console.log("day 01 step 1: " + step1.toString());
    console.log("day 01 step 2: " + step2.toString());
  }
}
