import { IDay } from './helpers';
import { readFileSync } from 'fs';

export class Day16 implements IDay<number[]> {
  solve(fileName: string) {
    const nums = readFileSync(fileName, 'utf-8')
      .split('\n')
      .join('-')
      .split('--')
      .map((s) => s.split('-').reduce((a, b) => a + parseInt(b), 0));

    const step1 = 123;

    const step2 = 456;

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day16.sample');

    console.log(`day 16 step 1: ${step1}`);
    console.log(`day 16 step 2: ${step2}`);
  }
}
