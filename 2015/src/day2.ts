import { readFileSync } from 'fs';
import { IDay } from './helpers';

export class Day2 implements IDay {
  solve(fileName: string) {
    const input = readFileSync(fileName, 'utf-8')
      .split('\n')
      .map((line) =>
        line
          .split('x')
          .map((n) => parseInt(n))
          .sort((a, b) => a - b)
      );

    const result1 = input.reduce(
      (acc, data) =>
        acc +
        2 * data[0] * data[1] +
        2 * data[0] * data[2] +
        2 * data[1] * data[2] +
        data[0] * data[1],
      0
    );

    const result2 = input.reduce(
      (acc, data) =>
        acc + 2 * (data[0] + data[1]) + data[0] * data[1] * data[2],
      0
    );

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve('data/day2.input');

    console.log('day 2 step 1: ' + step1.toString());
    console.log('day 2 step 2: ' + step2.toString());
  }
}
