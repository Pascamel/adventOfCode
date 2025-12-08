import { day06input } from "./data";
import { IDay } from "./helpers";

export class Day6 implements IDay<number[]> {
  solve(input: string) {
    const file = input.split("");

    const search = (count: number) => {
      let [result, found] = [-1, false];

      while (!found) {
        result++;
        found = new Set(file.slice(result, result + count)).size === count;
      }

      return result + count;
    };

    const step1 = search(4);
    const step2 = search(14);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day06input);

    console.log(`day 6 step 1: ${step1}`);
    console.log(`day 6 step 2: ${step2}`);
  }
}
