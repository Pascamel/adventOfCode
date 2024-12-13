import { listenerCount } from "process";
import { day13input, day13sample } from "./data";
import { IDay } from "./helpers";

type Point = [number, number];
type Line = [number, number, number, number, number, number];

export class Day13 implements IDay<number[]> {
  play(input: Line, step2: boolean) {
    const a: Point = [input[0], input[1]];
    const b: Point = [input[2], input[3]];
    const increment = step2 ? 10000000000000 : 0;
    const gift: Point = [input[4] + increment, input[5] + increment];

    const slopeA = a[1] / a[0];

    const [x, y] = this.intersect([0, 0], a, gift, [
      gift[0] + b[0],
      gift[1] + b[1],
    ])!;

    const slope = y / x;

    if (slope === slopeA) {
      if ((x / a[0]) % 1 === 0 && ((gift[0] - x) / b[0]) % 1 === 0) {
        return (x / a[0]) * 3 + (gift[0] - x) / b[0];
      }
    } else {
      if ((x / b[0]) % 1 === 0 && ((gift[0] - x) / a[0]) % 1 === 0) {
        return x / b[0] + (3 * (gift[0] - x)) / a[0];
      }
    }

    return 0;
  }

  intersect(p1: Point, p2: Point, p3: Point, p4: Point): Point | null {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const [x3, y3] = p3;
    const [x4, y4] = p4;

    const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denom == 0) {
      return null;
    }

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

    return [x1 + ua * (x2 - x1), y1 + ua * (y2 - y1)];
  }

  solve(input: string) {
    const lines = input
      .split("\n\n")
      .map((line) => line.match(/\d+/g)?.map((n) => parseInt(n)) as Line);

    const step1 = lines.reduce((acc, line) => acc + this.play(line, false), 0);
    const step2 = lines.reduce((acc, line) => acc + this.play(line, true), 0);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day13input);

    console.log(`day 13 step 1: ${step1}`);
    console.log(`day 13 step 2: ${step2}`);
  }
}
