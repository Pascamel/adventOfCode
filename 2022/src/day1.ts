import { IDay } from './helpers';
import { readFileSync } from 'fs';

export class Day1 implements IDay {
  solve(fileName: string) {
    const nums = readFileSync(fileName, 'utf-8')
      .split('\n')
      .join('-')
      .split('--')
      .map((s) => s.split('-').reduce((a, b) => a + parseInt(b), 0));

    const step1 = Math.max(...nums);

    const step2 = nums
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a + b, 0);

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day1.input');

    console.log('day 1 step 1: ' + step1.toString());
    console.log('day 1 step 2: ' + step2.toString());
  }
}
