import { day14input } from './data';
import { IDay } from './helpers';

export class Day14 implements IDay {
  distanceAfter(time: number, speed: number, fly: number, rest: number) {
    const loops = Math.floor(time / (fly + rest));
    const timeleft = time - loops * (fly + rest);

    return loops * fly * speed + Math.min(timeleft, fly) * speed;
  }

  part1(time: number, input: number[][]) {
    return input.reduce((acc, line) => {
      return Math.max(acc, this.distanceAfter(time, line[0], line[1], line[2]));
    }, 0);
  }

  part2(time: number, input: number[][]) {
    const distances = input.map(
      (line) =>
        new Array(2503)
          .fill(0)
          .map((_, i) => i)
          .map((i) => this.distanceAfter(i + 1, line[0], line[1], line[2])),

      [] as number[][]
    );

    const scoreLeader = new Array(2503)
      .fill(0)
      .map((_, i) =>
        distances.reduce((acc, score) => Math.max(acc, score[i]), 0)
      );

    return distances
      .map(
        (line) =>
          line.map((score, i) => (score === scoreLeader[i] ? 1 : 0)) as number[]
      )
      .map((line) => line.reduce((acc, v) => acc + v))
      .reduce((acc, v) => Math.max(acc, v));
  }

  solve(data: string) {
    const time = 2503;
    const input = data
      .split('\n')
      .map((line) => line.match(/\b\d+\b/g)!.map((n) => parseInt(n)));

    const result1 = this.part1(time, input);
    const result2 = this.part2(time, input);

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve(day14input);

    console.log(`day 14 step 1: ${step1}`);
    console.log(`day 14 step 2: ${step2}`);
  }
}
