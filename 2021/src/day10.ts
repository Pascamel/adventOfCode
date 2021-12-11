import { readFileSync } from 'fs';
import { IDay } from './helpers';

export class Day10 implements IDay {
  solve(fileName: string) {
    const nums = readFileSync(fileName, 'utf-8')
      .split('\n')
      .map((num) => parseInt(num));

    let result1 = 123;
    let result2 = 456;

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve('data/day10.input');

    console.log('day 10 step 1: ' + step1.toString());
    console.log('day 10 step 2: ' + step2.toString());
  }
}
