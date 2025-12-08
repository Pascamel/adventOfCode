import { IDay } from "./helpers";
import { readFileSync } from "fs";
import { day01input } from "./data";

export class Day1 implements IDay<number[]> {
  solve(input: string) {
    const nums = input
      .split("\n")
      .join("-")
      .split("--")
      .map((s) => s.split("-").reduce((a, b) => a + parseInt(b), 0));

    const step1 = Math.max(...nums);

    const step2 = nums
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a + b, 0);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day01input);

    console.log(`day 1 step 1: ${step1}`);
    console.log(`day 1 step 2: ${step2}`);
  }
}
