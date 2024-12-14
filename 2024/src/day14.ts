import { day14input, day14sample } from "./data";
import { IDay } from "./helpers";

type Point = { row: number; col: number };
type Robot = { p: Point; v: Point };

export class Day14 implements IDay<number[]> {
  countCorners(robots: Robot[], size: Point) {
    let result = [0, 0, 0, 0];

    for (let robot of robots) {
      if (robot.p.row === (size.row - 1) / 2) {
        continue;
      }
      if (robot.p.col === (size.col - 1) / 2) {
        continue;
      }

      const top = robot.p.row < (size.row - 1) / 2;
      const left = robot.p.col < (size.col - 1) / 2;

      const i = (top ? 0 : 2) + (left ? 0 : 1);

      result[i]++;
    }

    return result;
  }

  consecutiveRobots(robots: Robot[], size: Point) {
    const r = robots.map((robot) => robot.p);
    r.sort((a, b) => (a.row !== b.row ? a.row - b.row : a.col - b.col));

    let count = 1;
    let result = 1;

    for (let i = 1; i < r.length; i++) {
      if (r[i - 1].row === r[i].row && r[i - 1].col === r[i].col - 1) {
        count++;
        result = Math.max(result, count);
      } else {
        count = 1;
      }
    }

    return result;
  }

  // negative numbers are a pain
  modulo(value: number, n: number) {
    return ((value % n) + n) % n;
  }

  part1(robots: Robot[], times: number, size: Point) {
    const data = robots.map((robot) => ({
      p: {
        row: this.modulo(robot.p.row + robot.v.row * times, size.row),
        col: this.modulo(robot.p.col + robot.v.col * times, size.col),
      },
      v: robot.v,
    }));

    const result = this.countCorners(data, size);

    return result.reduce((acc, x) => acc * x, 1);
  }

  part2(robots: Robot[], times: number, size: Point) {
    let current = 0;
    let result = 0;

    for (let time = 0; time < times; time++) {
      const data = robots.map((robot) => ({
        p: {
          row: this.modulo(robot.p.row + robot.v.row * time, size.row),
          col: this.modulo(robot.p.col + robot.v.col * time, size.col),
        },
        v: robot.v,
      }));

      const length = this.consecutiveRobots(data, size);

      if (length > current) {
        current = length;
        result = time;
      }
    }

    return result;
  }

  solve(input: string) {
    const robots = input.split("\n").map((line) => {
      const data = line
        .match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/)!
        .slice(1, 5)
        .map((x) => parseInt(x, 10));

      return {
        p: { row: data[1], col: data[0] },
        v: { row: data[3], col: data[2] },
      } as Robot;
    });

    const step1 = this.part1(robots, 100, { row: 103, col: 101 });
    const step2 = this.part2(robots, 103 * 101, { row: 103, col: 101 });

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve(day14input);

    console.log(`day 14 step 1: ${step1}`);
    console.log(`day 14 step 2: ${step2}`);
  }
}
