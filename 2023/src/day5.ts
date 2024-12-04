import { IDay, Sum } from './helpers';
import { readFileSync } from 'fs';

export class Day5 implements IDay<number[]> {
  solve(fileName: string) {
    const nums = readFileSync(fileName, 'utf-8').split('\n');

    const step1 = 123;
    const step2 = 456;

    return [step1, step2];
  }

  run() {
    const [step1, step2] = this.solve('data/day5.sample'); // input');

    console.log(`day 5 step 1: ${step1}`);
    console.log(`day 5 step 2: ${step2}`);
  }
}
