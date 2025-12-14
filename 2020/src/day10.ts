import { day10sample1 } from "./data";
import { IDay } from "./helpers";

export class Day10 implements IDay {
  part1(data: number[]): number {
    const differences = new Array(4).fill(0);

    for (let i = 0; i < data.length - 1; i++) {
      const difference = data[i + 1] - data[i];
      differences[difference]++;
    }

    return differences[1] * differences[3];
  }

  part2(data: number[]): number {
    const memo = new Map<number, number>();

    const helper = (index: number): number => {
      if (memo.has(index)) {
        return memo.get(index)!;
      }

      if (index === data.length - 1) {
        return 1;
      }

      const find1 = data.findIndex((n) => n === data[index] + 1);
      const find2 = data.findIndex((n) => n === data[index] + 2);
      const find3 = data.findIndex((n) => n === data[index] + 3);

      const result =
        (find1 > -1 ? helper(find1) : 0) +
        (find2 > -1 ? helper(find2) : 0) +
        (find3 > -1 ? helper(find3) : 0);

      memo.set(index, result);

      return result;
    };

    return helper(0);
  }

  solve(input: string) {
    const data = input.split("\n").map(Number);
    data.push(0, Math.max(...data) + 3);
    data.sort((a, b) => a - b);

    const step1 = this.part1(data);
    const step2 = this.part2(data);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day10sample1);

    console.log(`day 10 step 1: ${step1}`);
    console.log(`day 10 step 2: ${step2}`);
  }
}
