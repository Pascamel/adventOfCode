import { day02input } from './data';
import { IDay } from './helpers';

export class Day02 implements IDay {
  solve(data: string) {
    const input = data.split('\n').map((line) =>
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
    const [step1, step2] = this.solve(day02input);

    console.log(`day 02 step 1: ${step1}`);
    console.log(`day 02 step 2: ${step2}`);
  }
}
