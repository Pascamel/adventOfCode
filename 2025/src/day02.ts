import { day02input, day02sample } from "./data";
import { IDay, Sum } from "./helpers";

export class Day02 implements IDay<number[]> {
  array(length: number) {
    return new Array(length).fill(0).map((_, i) => i + 1);
  }

  solve(input: string) {
    const lines = input
      .split(",")
      .map((s) => s.split("-"))
      .map((s) => s.map(Number));

    const invalids1 = new Array(99999)
      .fill(0)
      .map((_, i) => i + 1)
      .map((i) => parseInt(`${i}${i}`, 10));

    const invalids2 = [
      ...new Set([
        ...this.array(99999).map((i) => parseInt(`${i}${i}`, 10)),
        ...this.array(999).map((i) => parseInt(`${i}${i}${i}`, 10)),
        ...this.array(99).map((i) => parseInt(`${i}${i}${i}${i}`, 10)),
        ...this.array(99).map((i) => parseInt(`${i}${i}${i}${i}${i}`, 10)),
        ...this.array(9).map((i) => parseInt(`${i}${i}${i}${i}${i}${i}`, 10)),
        ...this.array(9).map((i) => parseInt(`${i}${i}${i}${i}${i}${i}${i}`, 10)),
      ]),
    ];

    const step1 = lines.reduce((acc, line) => {
      const found = invalids1.filter((v) => v >= line[0] && v <= line[1]);

      return acc + Sum(found);
    }, 0);

    const step2 = lines.reduce((acc, line) => {
      const found = invalids2.filter((v) => v >= line[0] && v <= line[1]);

      return acc + Sum(found);
    }, 0);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day02sample);

    console.log(`day 02 step 1: ${step1}`);
    console.log(`day 02 step 2: ${step2}`);
  }
}
