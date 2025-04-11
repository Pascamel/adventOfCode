import { day17input, day17sample } from "./data";
import { IDay } from "./helpers";

export class Day17 implements IDay {
  solve(data: string) {
    const input = data.split("\n").map((n) => parseInt(n));
    const target = input.length < 10 ? 25 : 150;

    const helper = (total: number, n: number, i?: number): number => {
      i = i || 0;

      if (n < 0) {
        return 0;
      } else if (total === 0) {
        return 1;
      } else if (i === input.length || total < 0) {
        return 0;
      }

      return helper(total, n, i + 1) + helper(total - input[i], n - 1, i + 1);
    };

    const result1 = helper(target, input.length);

    let i = 1;
    let result2 = null;

    while (!result2) {
      result2 = helper(target, i++);
    }

    return [result1, result2];
  }

  run() {
    const [step1s, step2s] = this.solve(day17sample);

    console.log(`day 17 sample 1: ${step1s}`);
    console.log(`day 17 sample 2: ${step2s}`);

    const [step1, step2] = this.solve(day17input);

    console.log(`day 17 step 1: ${step1}`);
    console.log(`day 17 step 2: ${step2}`);
  }
}
