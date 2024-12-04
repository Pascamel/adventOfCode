import { readFileSync } from 'fs';
import { IDay } from './helpers';

export class Day2 implements IDay<number[]> {
  toDiff(values: number[]) {
    return values.reduce(
      (acc, v, i) => (i === 0 ? acc : [...acc, values[i - 1] - v]),
      [] as number[]
    );
  }

  safe1(values: number[]) {
    const diffs = this.toDiff(values);

    return (
      (Math.max(...diffs) < 0 && Math.min(...diffs) >= -3) ||
      (Math.min(...diffs) > 0 && Math.max(...diffs) <= 3)
    );
  }

  safe2(values: number[]) {
    let i = values.length - 1;

    if (this.safe1(values)) {
      return true;
    }

    while (i >= 0) {
      if (this.safe1([...values.slice(0, i), ...values.slice(i-- + 1)])) {
        return true;
      }
    }

    return false;
  }

  solve(fileName: string) {
    const lines = readFileSync(fileName, 'utf-8')
      .split('\n')
      .map((line) => line.split(' ').map((v) => parseInt(v)));

    const step1 = lines.filter((diff) => this.safe1(diff)).length;

    const step2 = lines.filter((diff) => this.safe2(diff)).length;

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day2.input');

    console.log(`day 2 step 1: ${step1}`);
    console.log(`day 2 step 2: ${step2}`);
  }
}
