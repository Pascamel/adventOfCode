import { day01input } from "./data";
import { IDay, Sum } from "./helpers";

const DIGITS = "zero,one,two,three,four,five,six,seven,eight,nine".split(",");

export class Day01 implements IDay<number[]> {
  solve(input: string) {
    const nums = input.split("\n");

    const step1 = nums
      .map((l) => l.split("").filter((c) => !isNaN(parseInt(c))))
      .map((l) => parseInt(`${l[0]}${l.pop()?.[0]}`, 10))
      .reduce(Sum);

    const pattern = (s: string, i: number) => `${s[0]}${i}${s.substring(1)}`;

    const step2 = nums
      .map((l) => DIGITS.reduce((s, d, i) => s.replaceAll(d, pattern(d, i)), l))
      .map((l) => l.split("").filter((c) => !isNaN(parseInt(c))))
      .map((l) => parseInt(`${l[0]}${l.pop()?.[0]}`))
      .reduce(Sum);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day01input);

    console.log(`day 01 step 1: ${step1}`);
    console.log(`day 01 step 2: ${step2}`);
  }
}
