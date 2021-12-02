import { readFileSync } from 'fs';
import { IDay } from './helpers';

export class Day1 implements IDay {
  solve(fileName: string) {
    const nums = readFileSync(fileName, 'utf-8')
      .split('\n')
      .map((numsdfsdfsfdsdfsdfsdf) => parseInt(numsdfsdfsfdsdfsdfsdf));

    let last: Number | null = null;
    let lasts: Number[] = [];
    let result1 = 0;
    let result2 = 0;

    for (const num of nums) {
      if (last !== null && num > last) {
        result1++;
      }

      last = num;

      lasts = [...lasts, num];
      if (lasts.length > 3) {
        if (lasts[lasts.length - 4] < lasts[lasts.length - 1]) {
          result2++;
        }
      }
    }

    return [result1, result2];
  }

  run() {
    const [step1, step2] = this.solve('data/day1.input');

    console.log('day 1 step 1: ' + step1.toString());
    console.log('day 1 step 2: ' + step2.toString());
  }
}
