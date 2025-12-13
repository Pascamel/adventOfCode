import { day09sample } from "./data";
import { IDay } from "./helpers";

export class Day09 implements IDay<number[]> {
  solve(input: string) {
    const data = input.split("\n").map((line) => line.split(" ").map(Number));

    return data.reduce<[number, number]>(
      (acc, line) => {
        const diffs = [line];

        while (diffs[diffs.length - 1].some((diff) => diff != 0)) {
          const lastDiff = diffs[diffs.length - 1];
          const diff = lastDiff.reduce<number[]>(
            (acc, curr, i) => (i === 0 ? acc : [...acc, curr - lastDiff[i - 1]]),
            []
          );
          diffs.push(diff);
        }

        return [
          acc[0] + diffs.slice(0, -1).reduce((acc, curr) => acc + curr[curr.length - 1], 0),
          acc[1] +
            diffs
              .reverse()
              .slice(1)
              .reduce((acc, curr) => curr[0] - acc, 0),
        ];
      },
      [0, 0]
    );
  }

  run() {
    const [step1, step2] = this.solve(day09sample);

    console.log(`day 09 step 1: ${step1}`);
    console.log(`day 09 step 2: ${step2}`);
  }
}
