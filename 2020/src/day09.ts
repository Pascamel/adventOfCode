import { day09sample } from "./data";
import { IDay } from "./helpers";

export class Day09 implements IDay {
  part1(data: number[]): number {
    for (let i = data.length < 25 ? 5 : 25; i < data.length; i++) {
      const list = data.slice(i - 25, i);
      const target = data[i];

      const found = list.some((n1) =>
        list.some((n2) => n1 + n2 === target && n1 !== n2)
      );

      if (!found) {
        return target;
      }
    }

    return -1;
  }

  part2(data: number[]): number {
    const target = this.part1(data);
    let start = 0;
    let end = 0;
    let sum = data[0];

    while (sum !== target) {
      if (sum < target) {
        end++;
        sum += data[end];
      } else if (sum > target) {
        sum -= data[start];
        start++;
      }
    }

    const range = data.slice(start, end + 1);

    return Math.min(...range) + Math.max(...range);
  }

  solve(input: string) {
    const data: number[] = input.split("\n").map(Number);

    const step1 = this.part1(data);
    const step2 = this.part2(data);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day09sample);

    console.log(`day 09 step 1: ${step1}`);
    console.log(`day 09 step 2: ${step2}`);
  }
}
