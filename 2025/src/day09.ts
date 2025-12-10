import { day09sample } from "./data";
import { IDay } from "./helpers";

export class Day09 implements IDay<number[]> {
  getRect(p1: number[], p2: number[]) {
    return {
      left: p1[0] < p2[0] ? p1[0] : p2[0],
      right: p1[0] < p2[0] ? p2[0] : p1[0],
      top: p1[1] < p2[1] ? p1[1] : p2[1],
      bottom: p1[1] < p2[1] ? p2[1] : p1[1],
    };
  }

  existCollision(lines: number[][], p1: number[], p2: number[], idx0: number, idx1: number) {
    const { left, right, top, bottom } = this.getRect(p1, p2);

    for (let i = 0; i < lines.length; i++) {
      let n = i + 1;
      if (n >= lines.length) {
        n = 0;
      }

      if (i === idx0 || i === idx1 || n === idx0 || n === idx1) {
        continue;
      }

      const box = this.getRect(lines[i], lines[n]);

      if (left < box.right && right > box.left && top < box.bottom && bottom > box.top) {
        return false;
      }
    }

    return true;
  }

  part1(lines: number[][]) {
    const pairs = lines.flatMap((line, index) =>
      lines.slice(index + 1).map((other) => [line, other])
    );

    const distances = pairs.map(
      ([a, b]) => Math.abs(a[0] - b[0] + 1) * (Math.abs(a[1] - b[1]) + 1)
    );

    return distances.sort((a, b) => b - a)[0];
  }

  part2(lines: number[][]) {
    const distances = [];

    for (let i = 0; i < lines.length - 1; i++) {
      const corner0 = lines[i];

      for (let n = i + 1; n < lines.length; n++) {
        const corner1 = lines[n];
        const noCollision = this.existCollision(lines, corner0, corner1, i, n);

        if (noCollision) {
          const area =
            (Math.abs(corner0[0] - corner1[0]) + 1) * (Math.abs(corner0[1] - corner1[1]) + 1);
          distances.push(area);
        }
      }
    }

    return distances.sort((a, b) => b - a)[0];
  }

  solve(input: string) {
    const lines = input.split("\n").map((line) => line.split(",").map(Number)) as [
      number,
      number,
    ][];

    const step1 = this.part1(lines);
    const step2 = this.part2(lines);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day09sample);

    console.log(`day 09 step 1: ${step1}`);
    console.log(`day 09 step 2: ${step2}`);
  }
}
