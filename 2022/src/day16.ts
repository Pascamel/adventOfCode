import { day16sample } from "./data";
import { IDay } from "./helpers";

export class Day16 implements IDay<number[]> {
  solve(input: string) {
    const nums = input
      .split("\n")
      .join("-")
      .split("--")
      .map((s) => s.split("-").reduce((a, b) => a + parseInt(b), 0));

    const step1 = 123;

    const step2 = 456;

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day16sample);

    console.log(`day 16 step 1: ${step1}`);
    console.log(`day 16 step 2: ${step2}`);
  }
}
