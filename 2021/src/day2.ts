import { day02input } from "./data";
import { IDay } from "./helpers";

export class Day2 implements IDay {
  solve(input: string) {
    const lines = input.split("\n");

    let horizontal = 0;
    let depth1 = 0;
    let depth2 = 0;
    let aim = 0;

    for (const line of lines) {
      const [order, count] = line.split(" ");

      switch (order) {
        case "forward":
          horizontal += +count;
          depth2 += aim * +count;
          break;
        case "up":
          depth1 -= +count;
          aim -= +count;
          break;
        case "down":
          depth1 += +count;
          aim += +count;
          break;
      }
    }

    return [horizontal * depth1, horizontal * depth2];
  }

  run() {
    const [step1, step2] = this.solve(day02input);

    console.log("day 2 step 1: " + step1.toString());
    console.log("day 2 step 2: " + step2.toString());
  }
}
